import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [ConfigModule.forRoot(), BlogModule],
  controllers: [AppController],
})
export class AppModule {}
