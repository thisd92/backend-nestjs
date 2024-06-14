import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('me')
  @ApiOperation({ summary: 'Check Token Payload' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async checkMe(@Request() req) {
    return { me: 'ok', payload: req.tokenPayload };
  }
}
