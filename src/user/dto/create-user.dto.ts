import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 6,
  })
  readonly password: string;

  @ApiPropertyOptional({ enum: ['Admin', 'User'] })
  @IsString()
  @IsOptional()
  readonly role?: string;
}
