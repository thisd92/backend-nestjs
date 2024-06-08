import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { StoreModule } from 'src/store/store.module';
import { FileService } from 'src/file/file.service';
import { ProductReview } from './entities/product-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductReview]), forwardRef(() => StoreModule)],
  controllers: [ProductController],
  providers: [ProductService, FileService],
  exports: [ProductService],
})
export class ProductModule {}
