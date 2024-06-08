import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodsRepository: Repository<PaymentMethod>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    paymentMethod: PaymentMethod,
  ): Promise<PaymentMethod> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    paymentMethod.user = user;
    return this.paymentMethodsRepository.save(paymentMethod);
  }

  findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodsRepository.find();
  }

  findOne(id: number): Promise<PaymentMethod> {
    return this.paymentMethodsRepository.findOne({ where: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.paymentMethodsRepository.delete(id);
  }
}
