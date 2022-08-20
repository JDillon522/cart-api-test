import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDefined, IsEmpty, IsNotEmpty, IsNumber, isPositive, IsPositive, IsUUID, ValidateNested } from "class-validator";
import { Product } from "../products/products.entity";

export interface IBaseCartResponse {
  success: boolean;
}

export interface ICartResponse extends IBaseCartResponse {
  products: Product[];
  totalCost: number;
}

export class NewProductRequest {

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => NewProduct)
  products: NewProduct[];
}

export class NewProduct {
  @IsNumber()
  @IsPositive()
  @IsDefined()
  product_id: number;

  @IsNumber()
  @IsPositive()
  @IsDefined()
  quantity: number;

  // @IsUUID('all')
  // @IsEmpty()
  user_id: string;
}

export interface ICartProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
