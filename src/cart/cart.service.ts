import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>
  ) { }

  public generateUserId(): string {
    return randomUUID();
  }
}
