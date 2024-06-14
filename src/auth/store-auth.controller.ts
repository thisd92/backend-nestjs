import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { StoreAuthService } from './store-auth.service';
import { AuthResetDto } from './dto/auth-reset.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth/store')
export class StoreAuthController {
  constructor(private readonly authStoreService: StoreAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Store Login' })
  @ApiResponse({ status: 200, description: 'Store authenticated successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async storeAuth(@Body() authDto: AuthLoginDto) {
    const result = await this.authStoreService.storeAuth(authDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Password Forget' })
  async storeForget(@Body() { email }: AuthForgetDto) {
    return this.authStoreService.forgetStore(email);
  }

  @Post('reset-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Reset Store Password' })
  async storeReset(@Body() { password }: AuthResetDto, @Request() req) {
    return this.authStoreService.resetStorePass(password, req.tokenPayload);
  }
}
