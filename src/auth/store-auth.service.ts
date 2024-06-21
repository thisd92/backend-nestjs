import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { UpdateStoreDto } from '../store/dto/update-store.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class StoreAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly storeService: StoreService,
    private readonly mailerService: MailerService,
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
      issuer: 'auth',
      audience: 'stores',
    };

    const accessToken = await this.authService.generateToken(payload);
    return { accessToken };
  }

  async forgetStore(email: string) {
    const store = await this.storeService.findByEmail(email);

    if (!store) {
      throw new UnauthorizedException('Invalid email');
    }

    const payload = {
      id: store.id,
      name: store.name,
      email: store.email,
      issuer: 'forget',
      audience: 'stores',
    };

    const accessToken = await this.authService.generateToken(payload);

    await this.mailerService.sendMail({
      subject: 'Recuperação de senha',
      to: email,
      template: 'forget',
      context: {
        name: store.name,
        url: `http://localhost:3000/${accessToken}`,
      },
    });

    return { success: true };
  }

  async resetStorePass(password: string, payload) {
    const { id } = payload;
    const { email } = payload;
    const updateStoreDto: UpdateStoreDto = { password };
    await this.storeService.update(id, updateStoreDto);
    return this.storeAuth({ email, password });
  }
}
