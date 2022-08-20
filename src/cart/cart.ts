import { Product } from "../products/products.entity";

export interface IBaseCartResponse {
  success: boolean;
}

export interface ICartResponse extends IBaseCartResponse {
  products: Product[];
  totalCost: number;
}

export interface INewProduct {
  product_id: number;
  quantity: number;
  user_id: string;
}

export interface ICartProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
