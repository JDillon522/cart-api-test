import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Res, Headers } from '@nestjs/common';
import { Cookies } from '../decorators/cookie.decorator';
import { CatalogService } from '../services/catalog.service';
import { IBaseCartResponse, ICartProduct, NewProduct, NewProductRequest } from './cart';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {

  constructor(
    private cartService: CartService,
    private catalogService: CatalogService
  ) { }

  // TODO add response interface
  @Get(['', 'items/:id'])
  public async getCartItemsForUser(
    @Headers('cartId') cartId: string,
    @Param('id') id: string,
    @Res({ passthrough: true }) res
  ) {
    if (!cartId) {
      cartId = this.cartService.generateCartId();
      res.setHeader('cartId', cartId);
    }
    return await this._getCartItemsForUser(cartId, id);
  }

  @Get('cartId')
  public generatecartId(@Res({ passthrough: true }) res): IBaseCartResponse {
    res.setHeader('cartId', this.cartService.generateCartId());
    return {
      success: true
    };
  }


  @Post('items')
  public async addProductsToCart(
    @Headers('cartId') cartId: string,
    @Body() req: NewProductRequest,
    @Res({ passthrough: true }) res
  ): Promise<IBaseCartResponse> {
    if (!cartId) {
      cartId = this.cartService.generateCartId();
      res.setHeader('cartId', cartId);
    }

    const response: { id: number }[] = await this.cartService.addProductToCart(cartId, req.products);

    if (!response.length) {
      throw new HttpException({ success: false }, 501);
    }

    return {
      success: true
    };
  }

  @Delete('items/:id')
  public async removeProductFromCart(@Headers('cartId') cartId: string, @Param('id') id: string): Promise<IBaseCartResponse> {
    const del = await this.cartService.removeProductFromCart(cartId, id);

    return {
      success: true
    }
  }

  @Put('items/:id/:qty')
  public async updateCartProductQuantity(
    @Headers('cartId') cartId: string,
    @Param('id') productId: string,
    @Param('qty') qty: string
  ): Promise<IBaseCartResponse> {
    const res = await this.cartService.updateCartProductQuantity(cartId, productId, Number(qty));

    return {
      success: true
    }
  }

  @Post('checkout')
  public async checkout(@Headers('cartId') cartId: string) {
    const cart = await this._getCartItemsForUser(cartId, null, 501);
    const checkout = await this.cartService.checkout(cartId);

    return cart;
  }

  private async _getCartItemsForUser(cartId: string, id?: string, errorStatus = 404) {
    const cartItems = await this.cartService.getCartItemsForUser(cartId, id);
    const products: ICartProduct[] = await this.catalogService.getProductsForCart(cartItems);

    // Map quantity from cart items to products
    products.forEach(product => {
      const cartItem = cartItems.find(i => i.product_id === product.id);
      product.quantity = cartItem.quantity
    });

    const totalCost = products.reduce((prev, current) => prev + (current.price * current.quantity), 0)

    /**
     * NOTE: the spec calls for it to fail if the cart is empty
     * I turned it off because I need a blank response on the client
     * I'm only keeping it on for getting a single product from the cart, which makes sense
     */
    if (id && !products.length) {
      throw new HttpException({ success: false }, errorStatus);
    }

    return {
      products: products,
      totalCost: totalCost,
      success: true
    };
  }
}
