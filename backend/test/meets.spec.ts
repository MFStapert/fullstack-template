import { INestApplication } from '@nestjs/common';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';
import request from 'supertest';
import { CreateMeetDto } from '../src/meets/dto/create-meet.dto';
import { MeetsModule } from '../src/meets/meets.module';
import { createTestingModule } from './shared/test-database.module';

describe('meets e2e', () => {
  let app: INestApplication;
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    const moduleFixture = await createTestingModule(postgresContainer, [MeetsModule]);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await postgresContainer.stop();
  });

  it('(POST) /meets', () => {
    const createMeetDto: CreateMeetDto = {
      title: 'new meet',
      users: [1, 2],
    };
    return request(app.getHttpServer())
      .post('/meets')
      .send(createMeetDto)
      .expect(201)
      .expect({ id: 1, title: 'new meet', userNames: ['Marijn', 'Yorick'] });
  });

  it('(GET) /meets/1', () => {
    return request(app.getHttpServer())
      .get('/meets/1')
      .expect(200)
      .expect({ id: 1, title: 'new meet', userNames: ['Marijn', 'Yorick'] });
  });

  it('(GET) /meets', () => {
    return request(app.getHttpServer())
      .get('/meets')
      .expect(200)
      .expect([{ id: 1, title: 'new meet' }]);
  });
});
