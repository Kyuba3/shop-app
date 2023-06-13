import { Module } from '@nestjs/common';
import { ProductsInCartController } from './products-in-cart.controller';
import { ProductsInCartService } from './products-in-cart.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProductsInCartController],
  providers: [ProductsInCartService],
  imports: [PrismaModule],
})
export class ProductsInCartModule {}
