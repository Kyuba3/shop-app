import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Length(9, 12)
  phoneNumber: string;

  @IsString()
  notesForCurier: string;
}
