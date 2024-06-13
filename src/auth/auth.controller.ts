import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async userAuth(@Body() authDto: AuthLoginDto) {
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
  async storeAuth(@Body() authDto: AuthLoginDto) {
    const result = await this.authService.storeAuth(authDto);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  @Post('user/forget')
  @ApiOperation({ summary: 'Password Forget' })
  async userForget(@Body() { email }: AuthForgetDto) {
    return this.authService.forgetUser(email);
  }

  @Post('user/reset')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Reset User Password' })
  async userReset(@Body() { password }: AuthResetDto, @Request() req) {
    return this.authService.resetUserPass(password, req.tokenPayload);
  }

  @Post('store/forget')
  @ApiOperation({ summary: 'Password Forget' })
  async storeForget(@Body() { email }: AuthForgetDto) {
    return this.authService.forgetStore(email);
  }

  @Post('store/reset')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Reset Store Password' })
  async storeReset(@Body() { password }: AuthResetDto, @Request() req) {
    return this.authService.resetStorePass(password, req.tokenPayload);
  }

  @Post('me')
  @ApiOperation({ summary: 'Check Token Payload' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async checkMe(@Request() req) {
    return { me: 'ok', payload: req.tokenPayload };
  }

}
