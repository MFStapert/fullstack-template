import { Module } from '@nestjs/common';
import { MeetController } from './controllers/meet.controller';
import { MeetService } from './services/meet.service';

@Module({
  controllers: [MeetController],
  providers: [MeetService],
})
export class MeetModule {}
