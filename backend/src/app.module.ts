import { DbModule } from '@db/db.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { LocationsModule } from './locations/locations.module';

const features = [LocationsModule];

@Module({
  imports: [...features, DbModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
})
export class AppModule {}
