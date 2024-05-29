import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  auth(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
