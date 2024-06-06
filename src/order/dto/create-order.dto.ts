import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOrderItemDto } from 'src/order-items/dto/create-order-item.dto';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  storeId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  items: CreateOrderItemDto[];

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
