import { Column, Entity, Generated, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/products.entity";


@Entity()
export class Cart {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  cart_id: string;

  @Column()
  product_id: number;

  @Column()
  quantity: number;
}
