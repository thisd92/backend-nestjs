import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { Store } from 'src/store/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductReview } from './product-review.entity';

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

  @Column('int')
  stock: number;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ default: '' })
  category: string;

  @Column('jsonb', { nullable: true })
  attributes: Record<string, any>;

  @Column({ default: true })
  isSellable: boolean;

  @Column({ unique: true })
  sku: string;

  @Column('decimal', { nullable: true })
  discountPrice: number;

  @Column('int', { nullable: true })
  discountPercentage: number;

  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @OneToMany(() => ProductReview, (review) => review.product)
  reviews: ProductReview[];

  @ManyToMany(() => OrderItem, (orderIem) => orderIem.product)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
