import { meetTable, schema, userToMeetTable } from '@db/schema';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreateMeetDto } from '../dto/create-meet.dto';
import { MeetDetailDto } from '../dto/meet-detail.dto';
import { MeetOverviewDto } from '../dto/meet-overview.dto';
import { toUserToMeet } from '../mappers/meets.mappers';

@Injectable()
export class MeetsService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async getMeets(): Promise<MeetOverviewDto[]> {
    return this.db
      .select({
        id: meetTable.id,
        title: meetTable.title,
      })
      .from(meetTable);
  }

  async createMeet(createMeetDto: CreateMeetDto): Promise<MeetDetailDto> {
    const [meet] = await this.db
      .insert(meetTable)
      .values({
        title: createMeetDto.title,
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
      },
      where: eq(meetTable.id, id),
    });

    if (!meet) {
      throw new NotFoundException(`Meet with ID ${id} not found`);
    }

    return {
      id: meet.id,
      title: meet.title,
      locationTitle: meet.location?.title,
      userNames: meet.meetToUsers.map(({ user }) => user.name),
    };
  }
}
