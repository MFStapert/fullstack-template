import { schema } from '@db/schema';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { Module } from '@nestjs/common';
import { LocationsController } from './controllers/locations.controller';
import { LocationsService } from './services/locations.service';

@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      tag: 'MEETS',
      useFactory() {
        return {
          postgres: {
            url: process.env.DATABASE_URL,
          },
          config: { schema },
        };
      },
    }),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
