import { Module } from '@nestjs/common';
import { MeetController } from './controllers/meet.controller';
import { MeetService } from './services/meet.service';
import { VoteService } from './services/vote.service';

@Module({
  controllers: [MeetController],
  providers: [MeetService, VoteService],
})
export class MeetModule {}
