import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './products/products.entity';
import { ProductsModule } from './products/products.module';

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
        Product
      ],
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
      logging: true,
      synchronize: process.env.NODE_ENV === 'production' ? false : true
    }),
    ProductsModule
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule {}
