import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ICartProduct } from '../cart/cart';
import { Product } from '../products/products.entity';

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

  public async getProductsForCart(products) {
    const ids = products.map(product => product.product_id);

    const items = await this.productRepo.createQueryBuilder('product')
                            .setFindOptions({
                              where: {
                                id: In(ids)
                              }
                            })
                            .getMany();
    return items as unknown as ICartProduct[];
  }
}
