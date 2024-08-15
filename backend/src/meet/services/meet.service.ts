import { meetTable, schema, userTable, userToMeetTable } from '@db/schema';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { inArray } from 'drizzle-orm/sql/expressions/conditions';
import { CreateMeetDto } from '../dto/create-meet.dto';
import { MeetDetailDto } from '../dto/meet-detail.dto';
import { MeetOverviewDto } from '../dto/meet-overview.dto';
import { toUserToMeet } from '../mappers/meet.mappers';

@Injectable()
export class MeetService {
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
    const users = await this.db
      .select()
      .from(userTable)
      .where(inArray(userTable.id, createMeetDto.users));
    if (users.length !== createMeetDto.users.length) {
      throw new BadRequestException('Invalid user was added');
    }
    if (!users.map(user => user.id).includes(createMeetDto.createdBy)) {
      throw new BadRequestException('Invalid createdBy');
    }

    const futureDate = new Date();
    futureDate.setMinutes(futureDate.getMinutes() + 2);

    const [meet] = await this.db
      .insert(meetTable)
      .values({
        title: createMeetDto.title,
        time: futureDate,
        createdBy: createMeetDto.createdBy,
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
