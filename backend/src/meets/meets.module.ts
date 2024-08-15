import { Module } from '@nestjs/common';
import { MeetsController } from './controllers/meets.controller';
import { MeetsService } from './services/meets.service';

@Module({
  controllers: [MeetsController],
  providers: [MeetsService],
})
export class MeetsModule {}
