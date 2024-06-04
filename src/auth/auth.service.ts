import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly storeService: StoreService,
    private jwtService: JwtService,
  ) {}

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  async userAuth(
    authDto: AuthDto,
  ): Promise<{ acess_token: string }> {
    const user = await this.userService.findByEmail(authDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passMatched = await this.verifyPassword(
      authDto.password,
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

  async storeAuth(
    authDto: AuthDto,
  ): Promise<{ acess_token: string }> {
    const store = await this.storeService.findByEmail(authDto.email);
    if (!store) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passMatched = await this.verifyPassword(
      authDto.password,
      store.password,
    );
    if (!passMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: store.id,
      email: store.email,
    };
    return {
      acess_token: await this.jwtService.signAsync(payload),
    };
  }
}
