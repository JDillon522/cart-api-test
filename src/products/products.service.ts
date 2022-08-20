import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { productsSeed } from './seed';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>
  ) { }

  public async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepo.createQueryBuilder('product').getMany();

    return products;
  }


}
