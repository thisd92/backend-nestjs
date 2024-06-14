import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'src/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { FileService } from './file/file.service';
import { MulterModule } from '@nestjs/platform-express';
import { OrderModule } from './order/order.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({
      dest: './uploads',
    }),
    UserModule,
    AuthModule,
    StoreModule,
    ProductModule,
    OrderModule,
    OrderItemsModule,
    PaymentMethodsModule,
  ],
  controllers: [AppController],
  providers: [AppService, FileService],
})
export class AppModule {}
