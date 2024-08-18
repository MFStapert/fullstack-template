import { meetTable, schema, userToMeetTable, voteTable } from '@db/schema';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, count, eq, isNull } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateMeetDto } from '../dto/create-meet.dto';
import { MeetDetailDto } from '../dto/meet-detail.dto';
import { MeetOverviewDto } from '../dto/meet-overview.dto';
import { toUserToMeet } from '../mappers/meet.mappers';

@Injectable()
export class MeetService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async getMeetByUserId(userId: number): Promise<MeetOverviewDto[]> {
    return this.db
      .select({
        id: meetTable.id,
        title: meetTable.title,
      })
      .from(meetTable)
      .leftJoin(userToMeetTable, eq(meetTable.id, userToMeetTable.meetId))
      .where(eq(userToMeetTable.userId, userId));
  }

  async createMeet(createMeetDto: CreateMeetDto): Promise<MeetDetailDto> {
    const futureDate = new Date();
    futureDate.setMinutes(futureDate.getMinutes() + 2);

    const [meet] = await this.db
      .insert(meetTable)
      .values({
        title: createMeetDto.title,
        time: futureDate,
        createdBy: createMeetDto.createdBy,
        finalized: false,
      })
      .returning();

    await this.db.insert(userToMeetTable).values(toUserToMeet(meet.id, createMeetDto));
    return this.getMeet(meet.id);
  }

  async getMeet(id: number): Promise<MeetDetailDto> {
    const meet = await this.db.query.meetTable.findFirst({
      with: {
        meetToUsers: {
          with: {
            user: true,
          },
        },
        location: true,
        createdBy: true,
      },
      where: eq(meetTable.id, id),
    });

    if (!meet) {
      throw new NotFoundException(`Meet with ID ${id} not found`);
    }

    return {
      id: meet.id,
      title: meet.title,
      finalized: meet.finalized,
      createdBy: meet.createdBy.id,
      locationTitle: meet.location?.title,
      userNames: meet.meetToUsers.map(({ user }) => user.name),
    };
  }

  public async finalizeMeet(meetId: number): Promise<void> {
    const votersLeftOnMeet = await this.votersLeftOnMeet(meetId);
    if (votersLeftOnMeet.length === 0) {
      const mostVotedLocation = await this.db
        .select({ locationId: voteTable.locationId, voteCount: count(voteTable.locationId) })
        .from(voteTable)
        .where(eq(voteTable.meetId, meetId))
        .groupBy(voteTable.locationId)
        .orderBy(count(voteTable.locationId));

      await this.db
        .update(meetTable)
        .set({ finalized: true, locationId: mostVotedLocation.pop().locationId } as unknown)
        .where(eq(meetTable.id, meetId));
    }
  }

  private async votersLeftOnMeet(meetId: number) {
    return this.db
      .select()
      .from(userToMeetTable)
      .leftJoin(voteTable, eq(userToMeetTable.userId, voteTable.createdBy))
      .where(and(eq(userToMeetTable.meetId, meetId), isNull(voteTable.createdBy)));
  }
}
