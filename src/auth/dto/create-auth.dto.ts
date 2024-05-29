import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
