import { BadRequestException, Injectable } from '@nestjs/common';
import { Products_In_Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsInCartService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Products_In_Order[]> {
    return this.prismaService.products_In_Order.findMany({
      include: { order: true, product: true },
    });
  }

  public async create(
    orderData: Omit<Products_In_Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Products_In_Order> {
    const { orderId, productId, ...otherData } = orderData;
    try {
      return await this.prismaService.products_In_Order.create({
        data: {
          ...otherData,
          order: {
            connect: { id: orderId },
          },
          product: {
            connect: { id: productId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException('Product doesnt exists');
      throw error;
    }
  }
}
