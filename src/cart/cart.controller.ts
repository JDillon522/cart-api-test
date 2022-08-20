import { Controller, Get, Res } from '@nestjs/common';
import { IBaseCartResponse } from './cart';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {

  constructor(
    private cartService: CartService
  ) { }

  @Get('userId')
  public generateUserId(@Res({ passthrough: true }) res): IBaseCartResponse {
    res.cookie('userId', this.cartService.generateUserId());
    return {
      success: true
    };
  }

}
