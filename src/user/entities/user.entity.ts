import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
