import { DbModule } from '@db/db.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { LocationModule } from './location/location.module';
import { LoggerMiddleware } from './logger.middleware';
import { MeetModule } from './meet/meet.module';
import { UserModule } from './user/user.module';

const features = [MeetModule, LocationModule, UserModule];

@Module({
  imports: [...features, DbModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
