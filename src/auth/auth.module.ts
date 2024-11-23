import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from '../app-config/app-config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return {
          secret: appConfigService.jwtKey,
        }
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
