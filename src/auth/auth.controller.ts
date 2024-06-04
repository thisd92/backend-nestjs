import { Controller, Post, Body, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/login')
  async userAuth(@Body(new ValidationPipe()) authDto: AuthDto) {
    const result = await this.authService.userAuth(authDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  @Post('store/login')
  async storeAuth(@Body(new ValidationPipe()) authDto: AuthDto) {
    const result = await this.authService.storeAuth(authDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }
}
