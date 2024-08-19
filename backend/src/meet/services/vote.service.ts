import { schema, voteTable } from '@db/schema';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateVoteDto } from '../dto/create.vote.dto';
import { VoteDto } from '../dto/vote.dto';
import { MeetService } from './meet.service';

@Injectable()
export class VoteService {
  private readonly logger = new Logger(VoteService.name);
  constructor(
    private readonly meetsService: MeetService,
    @Inject('DB') private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async getVotesByMeet(meetId: number): Promise<VoteDto[]> {
    return this.db
      .select({ createdBy: voteTable.createdBy, locationId: voteTable.locationId })
      .from(voteTable)
      .where(eq(voteTable.meetId, meetId));
  }

  async createVote(meetId: number, createVoteDto: CreateVoteDto): Promise<void> {
    try {
      await this.db.insert(voteTable).values({
        meetId: meetId,
        createdBy: createVoteDto.createdBy,
        locationId: createVoteDto.locationId,
      });
      await this.meetsService.finalizeMeet(meetId);
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException('Invalid vote');
    }
  }

  async updateVote(voteId: number, locationId: number): Promise<void> {
    await this.db
      .update(voteTable)
      .set({
        locationId: locationId,
      })
      .where(eq(voteTable.id, voteId));
  }
}
