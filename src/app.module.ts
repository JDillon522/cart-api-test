import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './products/products.entity';
import { CatalogModule } from './products/catalog.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Product,
        Cart
      ],
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
      logging: true,
      synchronize: process.env.NODE_ENV === 'production' ? false : true
    }),
    CatalogModule,
    CartModule
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule {}
