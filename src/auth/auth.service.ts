import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload) {
    return await this.jwtService.signAsync(payload, {
      subject: String(payload.id),
    });
  }

  async verifyToken(token: string) {
    try {
      const data = this.jwtService.verifyAsync(token);
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}
