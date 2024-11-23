import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { loggingMiddleware } from '../common/middlewares/logging.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './data/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(loggingMiddleware)
            .forRoutes(UserController)
    }
}
