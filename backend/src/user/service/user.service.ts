import { schema, userTable } from '@db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async getUser(userId: number): Promise<UserDto> {
    const user = await this.db.select().from(userTable).where(eq(userTable.id, userId));
    return user.pop();
  }

  async getUsers(): Promise<UserDto[]> {
    return this.db.select().from(userTable);
  }
}
