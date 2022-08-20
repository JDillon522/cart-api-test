import { Product } from "./products.entity";

export interface ICatalogBaseResponse {
  success: boolean;
}

export interface IGetCatalogSize extends ICatalogBaseResponse {
  count: number;
}

export interface IGetCatalogProducts extends ICatalogBaseResponse {
  products: Product[];
}
