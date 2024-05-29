import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async auth(@Body() createAuthDto: CreateAuthDto) {
    const result = await this.authService.auth(createAuthDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }
}
