import { forwardRef, Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { OrderModule } from '../order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { DatabaseModule } from '../database.module';
import { Product } from '../product/entities/product.entity';
import { Store } from '../store/entities/store.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([OrderItem, Product, Store]),
    forwardRef(() => OrderModule),
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
