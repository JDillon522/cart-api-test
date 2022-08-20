import { Controller, Get, Post } from '@nestjs/common';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

  constructor(
    private productService: ProductsService
  ) { }

  @Get('')
  public async getAllProducs(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }


}
