import { IsString } from "class-validator";

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
  City: string;

  @IsString()
  State: string;
}
