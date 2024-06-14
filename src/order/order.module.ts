import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsModule } from 'src/order-items/order-items.module';
import { Order } from './entities/order.entity';
import { DatabaseModule } from 'src/database/database.module';
import { Product } from 'src/product/entities/product.entity';
import { Store } from 'src/store/entities/store.entity';
import { User } from 'src/user/entities/user.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';
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
