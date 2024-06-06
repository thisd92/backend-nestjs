import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ default: '' })
  category: string;

  @Column('jsonb', { nullable: true })
  attributes: Record<string, any>;

  @Column({ default: true })
  isSellable: boolean;

  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => OrderItem, (orderIem) => orderIem.product)
  orderItems: OrderItem[];
}
