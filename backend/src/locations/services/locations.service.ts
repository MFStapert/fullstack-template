import { locationTable, schema } from '@db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { LocationDto } from '../dto/location.dto';

@Injectable()
export class LocationsService {
  constructor(@Inject('DB') private db: PostgresJsDatabase<typeof schema>) {}

  async getLocations(): Promise<LocationDto[]> {
    return this.db.select().from(locationTable);
  }
}
