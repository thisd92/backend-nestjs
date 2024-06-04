import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
