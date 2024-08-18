import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMeetDto } from '../dto/create-meet.dto';
import { CreateVoteDto } from '../dto/create.vote.dto';
import { MeetDetailDto } from '../dto/meet-detail.dto';
import { MeetOverviewDto } from '../dto/meet-overview.dto';
import { UpdateVoteDto } from '../dto/update.vote.dto';
import { VoteDto } from '../dto/vote.dto';
import { MeetService } from '../services/meet.service';
import { VoteService } from '../services/vote.service';

@ApiTags('Meets')
@Controller('meets')
export class MeetController {
  constructor(
    private readonly meetsService: MeetService,
    private readonly voteService: VoteService,
  ) {}

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

  @Post(':meetId/vote')
  async createVote(
    @Param('meetId', ParseIntPipe) meetId: number,
    @Body() createVoteDto: CreateVoteDto,
  ): Promise<void> {
    return this.voteService.createVote(meetId, createVoteDto);
  }
  @Get(':meetId/votes')
  async getVotes(@Param('meetId', ParseIntPipe) meetId: number): Promise<VoteDto[]> {
    return this.voteService.getVotesByMeet(meetId);
  }

  @Put('/votes/:voteId')
  async updateVote(
    @Param('voteId', ParseIntPipe) voteId: number,
    @Body() updateVoteDto: UpdateVoteDto,
  ): Promise<void> {
    return this.voteService.updateVote(voteId, updateVoteDto.locationId);
  }
}
