import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsArray()
  @IsOptional()
  images: string[];

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsObject()
  @IsOptional()
  attributes?: Record<string, any>;

  @IsNumber()
  @IsNotEmpty()
  storeId: number;
}