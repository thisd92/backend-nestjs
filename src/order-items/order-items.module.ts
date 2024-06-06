import { forwardRef, Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { OrderService } from 'src/order/order.service';
import { OrderModule } from 'src/order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { DatabaseModule } from 'src/database.module';
import { Product } from 'src/product/entities/product.entity';
import { Store } from 'src/store/entities/store.entity';

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
