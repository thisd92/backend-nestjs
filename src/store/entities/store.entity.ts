import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  cep: string
  
  @Column()
  adress: string
  
  @Column()
  City: string
  
  @Column()
  State: string

}
