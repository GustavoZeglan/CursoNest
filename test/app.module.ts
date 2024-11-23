import { Module } from '@nestjs/common';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { UserModule } from '../src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/auth.module';
import * as path from 'path';
import { AppConfigModule } from '../src/app-config/app-config.module';
import { AppConfigService } from '../src/app-config/app-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return {
          type: "sqlite",
          database: ':memory',
          entities: [path.join(__dirname, "..", "src", "**", "*.entity.{ts,js}")],
          synchronize: appConfigService.databaseSynchronization,
        }
      }
    }),
    UserModule,
    AuthModule,
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
