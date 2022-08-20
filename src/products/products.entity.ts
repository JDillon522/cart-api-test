import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface INewProduct {
  name: string;
  price: number;
  quantity: number;
  // friendlyName: string;
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  // @Column()
  // quantity: number;
}
