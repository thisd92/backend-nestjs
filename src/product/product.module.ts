import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { StoreModule } from 'src/store/store.module';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), forwardRef(() => StoreModule)],
  controllers: [ProductController],
  providers: [ProductService, FileService],
  exports: [ProductService],
})
export class ProductModule {}
