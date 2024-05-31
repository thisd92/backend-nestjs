import { Controller, Post, Body, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/login')
  async userAuth(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto) {
    const result = await this.authService.userAuth(createAuthDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  @Post('store/login')
  async storeAuth(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto) {
    const result = await this.authService.storeAuth(createAuthDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }
}
