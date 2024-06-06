import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepostory: Repository<Product>,
  ) {}

  async create(
    createOrderItemDto: CreateOrderItemDto,
    order: Order,
  ): Promise<OrderItem> {
    const item = { ...createOrderItemDto };
    const product = await this.productRepostory.findOne({
      where: { id: item.productId },
    });
    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found`);
    }
    const newOrderItem = this.orderItemRepository.create({
      ...createOrderItemDto,
      product: product,
      order: order,
    });
    return await this.orderItemRepository.save(newOrderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find();
  }

  async findOne(id: number): Promise<OrderItem> {
    return await this.orderItemRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    const existingOrderItem = await this.orderItemRepository.findOne({
      where: { id: id },
    });
    if (!existingOrderItem) {
      throw new Error(`Order item with ID ${id} not found`);
    }

    const updatedOrderItem = { ...existingOrderItem, ...updateOrderItemDto };

    return await this.orderItemRepository.save(updatedOrderItem);
  }

  async remove(id: number): Promise<void> {
    const existingOrderItem = await this.orderItemRepository.findOne({
      where: { id: id },
    });
    if (!existingOrderItem) {
      throw new Error(`Order item with ID ${id} not found`);
    }

    await this.orderItemRepository.remove(existingOrderItem);
  }
}
