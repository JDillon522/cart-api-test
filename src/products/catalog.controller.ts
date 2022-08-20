import { Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { Product } from './products.entity';
import { CatalogService as CatalogService } from './catalog.service';
import { IGetCatalogProducts, IGetCatalogSize } from './catalog';

@Controller('catalog')
export class CatalogController {

  constructor(
    private catalogService: CatalogService
  ) { }

  @Get('')
  public async getAllProducts(): Promise<IGetCatalogProducts> {
    const products = await this.catalogService.getAllProducts();

    return {
      success: true,
      products: products
    };
  }

  @Get('size')
  public async getCatalogSize(): Promise<IGetCatalogSize> {
    const size = await this.catalogService.getCatalogSize();

    return {
      success: true,
      count: size
    };
  }

  @Get(':id')
  public async getProductById(@Param('id') id: string): Promise<IGetCatalogProducts> {
    const product = await this.catalogService.getProductById(Number(id));

    if (!product) {
      throw new HttpException({ success: false }, 404);
    }

    return {
      success: true,
      products: [product]
    };
  }
}
