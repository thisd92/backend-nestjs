import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetDto {
  @IsStrongPassword({ minLength: 6 })
  password: string;
}
