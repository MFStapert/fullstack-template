import { schema, voteTable } from '@db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateVoteDto } from '../dto/create.vote.dto';

@Injectable()
export class VoteService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async createVote(meetId: number, createVoteDto: CreateVoteDto): Promise<void> {
    await this.db.insert(voteTable).values({
      meetId: meetId,
      createdBy: createVoteDto.createdBy,
      locationId: createVoteDto.locationId,
    });
  }
}
