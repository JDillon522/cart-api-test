import { Body, Controller, Get, HttpException, Param, Post, Res } from '@nestjs/common';
import { Cookies } from '../decorators/cookie.decorator';
import { CatalogService } from '../services/catalog.service';
import { IBaseCartResponse, ICartProduct, INewProduct } from './cart';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {

  constructor(
    private cartService: CartService,
    private catalogService: CatalogService
  ) { }

  // TODO add response interface
  @Get(['', 'item/:id'])
  public async getCartItemsForUser(@Cookies('userId') userId: string, @Param('id') id: string) {
    const cartItems = await this.cartService.getCartItemsForUser(userId, id);
    const products: ICartProduct[] = await this.catalogService.getProductsForCart(cartItems);

    // Map quantity from cart items to products
    products.forEach(product => {
      const cartItem = cartItems.find(i => i.product_id === product.id);
      product.quantity = cartItem.quantity
    });

    const totalCost = products.reduce((prev, current) => prev + current.price, 0)

    return {
      products: products,
      totalCost: totalCost,
      success: true
    };
  }

  @Get('userId')
  public generateUserId(@Res({ passthrough: true }) res): IBaseCartResponse {
    res.cookie('userId', this.cartService.generateUserId());
    return {
      success: true
    };
  }


  @Post('items')
  public async addProductsToCart(@Cookies('userId') userId: string, @Body() products: INewProduct[]): Promise<IBaseCartResponse> {
    if (!userId) {
      userId = this.cartService.generateUserId();
    }
    const response: { id: number }[] = await this.cartService.addProductToCart(userId, products);

    if (!response.length) {
      throw new HttpException({ success: false }, 501);
    }

    return {
      success: true
    };
  }

}
