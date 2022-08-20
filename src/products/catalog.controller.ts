import { Controller, Get, Param, Post } from '@nestjs/common';
import { Product } from './products.entity';
import { CatalogService as CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {

  constructor(
    private catalogService: CatalogService
  ) { }

  @Get('')
  public async getAllProducts(): Promise<Product[]> {
    return await this.catalogService.getAllProducts();
  }

  @Get(':id')
  public async getProductById(@Param('id') id: string): Promise<Product> {
    return await this.catalogService.getProductById(Number(id));
  }

}
