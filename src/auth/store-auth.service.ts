import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { UpdateStoreDto } from 'src/store/dto/update-store.dto';

@Injectable()
export class StoreAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly storeService: StoreService,
  ) {}

  async storeAuth({
    email,
    password,
  }: AuthLoginDto): Promise<{ accessToken: string }> {
    const store = await this.storeService.findByEmail(email);
    if (!store) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await this.authService.verifyPassword(
      password,
      store.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: store.id,
      name: store.name,
      email: store.email,
    };

    const accessToken = await this.authService.generateToken(payload);
    return { accessToken };
  }

  async forgetStore(email: string) {
    const store = await this.storeService.findByEmail(email);

    if (!store) {
      throw new UnauthorizedException('Invalid email');
    }

    // TODO: Enviar email

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
