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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async userAuth(@Body() authDto: AuthDto) {
    const result = await this.authService.userAuth(authDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  @Post('store/login')
  @ApiOperation({ summary: 'Store Login' })
  @ApiResponse({ status: 200, description: 'Store authenticated successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async storeAuth(@Body() authDto: AuthDto) {
    const result = await this.authService.storeAuth(authDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
