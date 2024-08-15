import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMeetDto } from '../dto/create-meet.dto';
import { MeetDetailDto } from '../dto/meet-detail.dto';
import { MeetOverviewDto } from '../dto/meet-overview.dto';
import { MeetsService } from '../services/meets.service';

@ApiTags('Meets')
@Controller('meets')
export class MeetsController {
  constructor(private readonly meetsService: MeetsService) {}

  @Get('')
  async getMeets(): Promise<MeetOverviewDto[]> {
    return this.meetsService.getMeets();
  }

  @Post('')
  async createMeet(@Body() meet: CreateMeetDto): Promise<MeetDetailDto> {
    return this.meetsService.createMeet(meet);
  }

  @Get(':id')
  async getMeet(@Param('id', ParseIntPipe) id: number): Promise<MeetDetailDto> {
    return this.meetsService.getMeet(id);
  }
}
