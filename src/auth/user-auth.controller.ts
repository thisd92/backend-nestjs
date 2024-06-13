import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserAuthService } from './user-auth.service';
import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth/user')
export class UserAuthController {
  constructor(private readonly authUserService: UserAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async userAuth(@Body() authDto: AuthLoginDto) {
    const result = await this.authUserService.userAuth(authDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Password Forget' })
  async userForget(@Body() { email }: AuthForgetDto) {
    return this.authUserService.forgetUser(email);
  }

  @Post('reset-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Reset User Password' })
  async userReset(@Body() { password }: AuthResetDto, @Request() req) {
    return this.authUserService.resetUserPass(password, req.tokenPayload);
  }
}
