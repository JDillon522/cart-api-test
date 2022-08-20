import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartController } from './cart.controller';
import { CartService } from '../services/cart.service';
import { CatalogService } from '../services/catalog.service';
import { Product } from '../products/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product])
  ],
  controllers: [
    CartController
  ],
  providers: [
    CartService,
    CatalogService
  ]
})
export class CartModule {}
