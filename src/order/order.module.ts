import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsModule } from '../order-items/order-items.module';
import { Order } from './entities/order.entity';
import { DatabaseModule } from '../database.module';
import { Product } from '../product/entities/product.entity';
import { Store } from '../store/entities/store.entity';
import { User } from '../user/entities/user.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { OrderStatusHistory } from './entities/order-status.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Order, User, Store, Product, OrderItem, OrderStatusHistory]),
    forwardRef(() => OrderItemsModule),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
