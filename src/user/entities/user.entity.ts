import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ default: '' })
  cpf: string;

  @Column()
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

  @Column({ default: false })
  admin?: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
