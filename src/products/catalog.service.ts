import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class CatalogService {

  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>
  ) { }

  public async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepo.createQueryBuilder('product').getMany();

    return products;
  }

  public async getProductById(id: number): Promise<Product> {
    const product = await this.productRepo.createQueryBuilder('product')
                            .select()
                            .where('product.id = :id', { id })
                            .getOne();

    return product;
  }

  public async getCatalogSize(): Promise<number> {
    const size = await this.productRepo.createQueryBuilder('product')
                          .select()
                          .getCount();

    return size;
  }

}
