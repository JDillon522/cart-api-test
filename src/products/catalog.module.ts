import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogController } from './catalog.controller';
import { Product } from './products.entity';
import { CatalogService } from '../services/catalog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product])

  ],
  controllers: [
    CatalogController
  ],
  providers: [
    CatalogService
  ]
})
export class CatalogModule {}
