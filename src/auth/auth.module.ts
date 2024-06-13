import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StoreModule } from 'src/store/store.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { StoreAuthService } from './store-auth.service';
import { UserAuthService } from './user-auth.service';
import { StoreAuthController } from './store-auth.controller';
import { UserAuthController } from './user-auth.controller';

@Module({
  imports: [
    UserModule,
    StoreModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController, StoreAuthController, UserAuthController],
  providers: [AuthService, StoreAuthService, UserAuthService, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
