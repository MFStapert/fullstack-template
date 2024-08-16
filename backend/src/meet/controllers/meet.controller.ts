import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMeetDto } from '../dto/create-meet.dto';
import { MeetDetailDto } from '../dto/meet-detail.dto';
import { MeetOverviewDto } from '../dto/meet-overview.dto';
import { MeetService } from '../services/meet.service';

@ApiTags('Meets')
@Controller('meets')
export class MeetController {
  constructor(private readonly meetsService: MeetService) {}

  @Post('')
  async createMeet(@Body() meet: CreateMeetDto): Promise<MeetDetailDto> {
    return this.meetsService.createMeet(meet);
  }

  @Get(':meetId')
  async getMeet(@Param('meetId', ParseIntPipe) meetId: number): Promise<MeetDetailDto> {
    return this.meetsService.getMeet(meetId);
  }

  @Get('by-user/:userId')
  async getMeetsByUser(@Param('userId', ParseIntPipe) userId: number): Promise<MeetOverviewDto[]> {
    return this.meetsService.getMeetByUserId(userId);
  }
}
