import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  cep: string;

  @Column()
  adress: string;
  
  @Column()
  adressNumber: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
