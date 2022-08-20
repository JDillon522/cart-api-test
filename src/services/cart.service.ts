import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { randomUUID } from 'crypto';
import { NewProduct } from '../cart/cart';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>
  ) { }

  public generateUserId(): string {
    return randomUUID();
  }

  public async getCartItemsForUser(userId: string, id?: string): Promise<Cart[]> {
    let cart = await this.cartRepo.createQueryBuilder('cart')
                            .select()
                            .where('cart.user_id = :id', { id: userId })
                            .getMany();

    if (id) {
      cart = cart.filter(product => product.product_id === Number(id));
    }

    return cart;
  }

  /**
   * Add products to the cart. If a user has already added a product DO NOT return an error,
   * increment its quantity
   *
   * @param userId the user's UUID generated for the cart
   * @param products the array of products to add
   * @returns
   */
  public async addProductToCart(userId: string, products: NewProduct[]): Promise<{ id: number }[]> {
    products.forEach(product => product.user_id = userId);
    const saved: { id: number }[] = [];

    for await (const product of products) {
      const productExists = await this.cartRepo.createQueryBuilder('cart').select()
                                      .where('cart.user_id = :userId', { userId })
                                      .andWhere('cart.product_id = :productId', { productId: product.product_id })
                                      .getOne();

      if (productExists) {
        const res = await this.cartRepo.createQueryBuilder('cart')
                                .update(Cart)
                                .where('cart.id = :id', { id: productExists.id })
                                .set({
                                  quantity: productExists.quantity + product.quantity
                                })
                                .returning(['id'])
                                .execute();

        saved.push(res.raw);

      } else {
        const res = await this.cartRepo.createQueryBuilder('cart')
          .insert()
          .values(product)
          .execute();

          saved.push(res.raw);
      }
    }

    return saved;
  }

  public async removeProductFromCart(userId: string, id: string) {
    const query = await this.cartRepo.createQueryBuilder('cart')
                          .delete()
                          .from(Cart)
                          .where('user_id = :userId', { userId: userId })
                          .andWhere('product_id = :id', { id: Number(id) })
                          .execute()

    return query;
  }



  public async updateCartProductQuantity(userId: string, productId: string, qty: number) {
    const query = await this.cartRepo.createQueryBuilder('cart')
                                .update(Cart)
                                .where('cart.product_id = :id', { id: productId })
                                .andWhere('cart.user_id = :userId', { userId })
                                .set({
                                  quantity: qty
                                })
                                .returning(['id'])
                                .execute();
    return query;
  }

  public async checkout(userId: string) {
    const query = await this.cartRepo.createQueryBuilder()
                              .delete()
                              .from(Cart)
                              .where('user_id = :userId', { userId })
                              .execute()

    return query;
  }
}
