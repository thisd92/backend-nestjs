import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
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
    };

    const accessToken = await this.authService.generateToken(payload);
    return { accessToken };
  }

  async forgetUser(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    // TODO: Enviar email

    return true;
  }

  async resetUserPass(password: string, payload) {
    const { id } = payload;
    const { email } = payload;
    const updateUserDto: UpdateUserDto = { password };
    await this.userService.update(id, updateUserDto);
    return this.userAuth({ email, password });
  }
}
