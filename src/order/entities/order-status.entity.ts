import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('order_status_history')
export class OrderStatusHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.statusHistory)
  order: Order;

  @Column()
  status: string;

  @Column()
  changedAt: Date;
}
