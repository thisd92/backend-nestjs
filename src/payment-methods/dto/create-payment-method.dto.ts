import { IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  type: string;

  @IsString()
  details: string;
}
