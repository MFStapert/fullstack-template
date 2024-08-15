import { runMigrations } from '@db/migrate';
import { schema } from '@db/schema';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { Test, TestingModule } from '@nestjs/testing';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';

export async function createTestingModule(
  postgresContainer: StartedPostgreSqlContainer,
  imports: unknown[],
): Promise<TestingModule> {
  process.env.DATABASE_URL = postgresContainer.getConnectionUri();

  const moduleFixture = await Test.createTestingModule({
    imports: [
      DrizzlePostgresModule.registerAsync({
        tag: 'DB',
        useFactory() {
          return {
            postgres: {
              url: postgresContainer.getConnectionUri(),
            },
            config: { schema },
          };
        },
      }),
      ...(imports as never),
    ],
  }).compile();

  await runMigrations();
  return moduleFixture;
}
