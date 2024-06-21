import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
  ) {}

  async userAuth({
    email,
    password,
  }: AuthLoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await this.authService.verifyPassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      issuer: 'auth',
      audience: 'users',
    };

    const accessToken = await this.authService.generateToken(payload);
    return { accessToken };
  }

  async forgetUser(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      issuer: 'forget',
      audience: 'users',
    };

    const accessToken = await this.authService.generateToken(payload);

    await this.mailerService.sendMail({
      subject: 'Recuperação de senha',
      to: email,
      template: 'forget',
      context: {
        name: user.name,
        url: `http://localhost:3000/${accessToken}`,
      },
    });

    return { success: true };
  }

  async resetUserPass(password: string, payload) {
    const { id, email } = payload;
    const updateUserDto: UpdateUserDto = { password };
    await this.userService.update(id, updateUserDto);
    return this.userAuth({ email, password });
  }
}
