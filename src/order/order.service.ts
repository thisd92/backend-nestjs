import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Store } from 'src/store/entities/store.entity';
import { OrderItemsService } from 'src/order-items/order-items.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    private orderItemsService: OrderItemsService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, storeId, items, total, status } = createOrderDto;

    const customer = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!customer) {
      throw new Error(`Customer with ID ${userId} not found`);
    }

    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });
    if (!store) {
      throw new Error(`Store with ID ${storeId} not found`);
    }

    const order = this.ordersRepository.create({
      user: customer,
      store: store,
      total: total,
      status: status,
    });

    const savedOrder = await this.ordersRepository.save(order);

    const orderItems = await Promise.all(
      items.map((item) => this.orderItemsService.create(item, savedOrder)),
    );

    savedOrder.items = orderItems;

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find({
      relations: ['items', 'user', 'store'],
    });
  }

  async findOne(id: number): Promise<Order> {
    return await this.ordersRepository.findOne({
      where: { id: id },
      relations: ['items', 'user', 'store'],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.ordersRepository.update(id, updateOrderDto);
    const updatedStore = await this.ordersRepository.findOne({
      where: { id: id },
    });
    return updatedStore;
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
