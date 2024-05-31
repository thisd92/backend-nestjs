import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsString()
  cnpj: string;

  @IsString()
  cep: string;

  @IsString()
  adress: string;

  @IsString()
  adressNumber: number;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
