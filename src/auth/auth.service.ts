import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { StoreService } from 'src/store/store.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UpdateStoreDto } from 'src/store/dto/update-store.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly storeService: StoreService,
    private jwtService: JwtService,
  ) {}

  async createToken(payload) {
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

  async userAuth({
    email,
    password,
  }: AuthLoginDto): Promise<{ acess_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passMatched = await this.verifyPassword(password, user.password);
    if (!passMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const acess_token = await this.createToken(payload);
    return { acess_token };
  }

  async storeAuth({
    email,
    password,
  }: AuthLoginDto): Promise<{ acess_token: string }> {
    const store = await this.storeService.findByEmail(email);
    if (!store) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passMatched = await this.verifyPassword(password, store.password);
    if (!passMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: store.id,
      name: store.name,
      email: store.email,
    };

    const acess_token = await this.createToken(payload);
    return { acess_token };
  }

  async forgetUser(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    // TO DO: Enviar email

    return true;
  }

  async resetUserPass(password: string, payload) {
    const { id } = payload;
    const { email } = payload;
    const updateUserDto: UpdateUserDto = { password };
    await this.userService.update(id, updateUserDto);
    return this.userAuth({ email, password });
  }

  async forgetStore(email: string) {
    const store = await this.storeService.findByEmail(email);

    if (!store) {
      throw new UnauthorizedException('Invalid email');
    }

    // TO DO: Enviar email

    return true;
  }

  async resetStorePass(password: string, payload) {
    const { id } = payload;
    const { email } = payload;
    const updateStoreDto: UpdateStoreDto = { password };
    await this.storeService.update(id, updateStoreDto);

    return this.storeAuth({ email, password });
  }
}
