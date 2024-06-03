import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Store } from 'src/store/entities/store.entity';
import { ProductResponseDto } from './dto/product-response.dto';
import { mapToProductResponse } from 'src/utils/product-mapper.util';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    
  ): Promise<ProductResponseDto> {
    const store = await this.storeRepository.findOne({
      where: { id: createProductDto.storeId },
    });
    if (!store) {
      throw new Error('Store not found');
    }
    
    const product = this.productRepository.create({
      ...createProductDto,
      store,
    });
    const productCreated = await this.productRepository.save(product);
    return mapToProductResponse(productCreated);
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find({
      relations: ['store'],
    });
    return products.map(mapToProductResponse);
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['store'],
    });

    if (!product) {
      throw new NotFoundException('Product Not Found');
    }
    return mapToProductResponse(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const updatedStore = await this.productRepository.findOne({
      where: { id: id },
    });
    return updatedStore;
  }

  async remove(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }
}
