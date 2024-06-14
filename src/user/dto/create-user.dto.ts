import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRole } from '../entities/user-role';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly cpf: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 6,
  })
  password: string;

  @ApiPropertyOptional({ enum: ['Admin', 'StoreOwner', 'User', 'Guest'] })
  @IsOptional()
  @IsEnum(UserRole)
  readonly role?: UserRole;
}
