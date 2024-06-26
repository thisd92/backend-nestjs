import { Order } from '../../order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddress } from './user-address.entity';
import { ProductReview } from '../../product/entities/product-review.entity';
import { PaymentMethod } from '../../payment-methods/entities/payment-method.entity';
import { UserRole } from './user-role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  cep: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  addressNumber: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  state: string;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ default: UserRole.User, type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => UserAddress, (address) => address.user)
  addresses: UserAddress[];

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
  paymentMethods: PaymentMethod[];

  @OneToMany(() => ProductReview, (review) => review.user)
  reviews: ProductReview[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
