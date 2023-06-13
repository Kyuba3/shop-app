import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateProductInOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsString()
  comment: string;
}
