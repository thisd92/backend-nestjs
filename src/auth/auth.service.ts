import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  async auth(createAuthDto: CreateAuthDto): Promise<{ acess_token: string }> {
    const user = await this.userService.findByEmail(createAuthDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passMatched = await this.verifyPassword(
      createAuthDto.password,
      user.password,
    );
    if (!passMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      acess_token: await this.jwtService.signAsync(payload),
    };
  }
}
