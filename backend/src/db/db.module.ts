import { schema } from '@db/schema';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      tag: 'DB',
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
  exports: [DrizzlePostgresModule],
})
export class DbModule {}
