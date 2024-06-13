import { IsString } from 'class-validator';

export class AuthForgetDto {
  @IsString()
  email: string;
}
