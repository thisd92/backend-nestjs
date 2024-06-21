import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { hashPass } from '../utils/hashPass.util';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}
  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const hashedPassword = await argon2.hash(createStoreDto.password);
    const store = this.storeRepository.create({
      ...createStoreDto,
      password: hashedPassword,
    });
    return this.storeRepository.save(store);
  }

  async findAll(): Promise<Store[]> {
    return this.storeRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: {
        id: id,
      },
      relations: ['products'],
    });
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

  async findByEmail(email: string): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const { password } = updateStoreDto;
    if (password) updateStoreDto.password = await hashPass(password);
    await this.storeRepository.update(id, updateStoreDto);
    const updatedStore = await this.storeRepository.findOne({
      where: { id: id },
    });
    return updatedStore;
  }

  async remove(id: number): Promise<void> {
    const result = await this.storeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Store not found');
    }
  }
}
