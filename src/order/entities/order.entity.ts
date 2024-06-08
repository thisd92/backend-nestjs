import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderStatusHistory } from './order-status.entity';
import { UserAddress } from 'src/user/entities/user-address.entity';

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
