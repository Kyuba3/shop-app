import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductsInCartService } from './products-in-cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductInOrderDTO } from './dtos/create-product-in-order.dto';

@Controller('products-in-cart')
export class ProductsInCartController {
  constructor(private productsInCartService: ProductsInCartService) {}

  @Get('/')
  getAll(): any {
    return this.productsInCartService.getAll();
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  create(@Body() productInOrder: CreateProductInOrderDTO) {
    return this.productsInCartService.create(productInOrder);
  }
}
