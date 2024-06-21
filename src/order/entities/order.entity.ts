import { OrderItem } from '../../order-items/entities/order-item.entity';
import { Store } from '../../store/entities/store.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatusHistory } from './order-status.entity';
import { UserAddress } from '../../user/entities/user-address.entity';
import { PaymentMethod } from '../../payment-methods/entities/payment-method.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Store, (store) => store.orders)
  store: Store;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  items: OrderItem[];

  @ManyToOne(() => UserAddress, { nullable: true })
  shippingAddress: UserAddress;

  @ManyToOne(() => PaymentMethod, { nullable: true })
  paymentMethod: PaymentMethod;

  @Column('decimal')
  total: number;

  @Column()
  status: string;

  @OneToMany(() => OrderStatusHistory, (history) => history.order)
  statusHistory: OrderStatusHistory[];
}
