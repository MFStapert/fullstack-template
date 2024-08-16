import { INestApplication } from '@nestjs/common';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';
import request from 'supertest';
import { CreateMeetDto } from '../src/meet/dto/create-meet.dto';
import { MeetModule } from '../src/meet/meet.module';
import { createTestingModule } from './shared/test-database.module';

describe('meets e2e', () => {
  let app: INestApplication;
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    const moduleFixture = await createTestingModule(postgresContainer, [MeetModule]);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await postgresContainer.stop();
  });

  it('Create meet', () => {
    const createMeetDto: CreateMeetDto = {
      title: 'new meet',
      createdBy: 1,
      users: [1, 2],
    };
    return request(app.getHttpServer())
      .post('/meets')
      .send(createMeetDto)
      .expect(201)
      .expect({ id: 2, title: 'new meet', userNames: ['Marijn', 'Yorick'] });
  });

  it('Create meet - invalid user', () => {
    const createMeetDto: CreateMeetDto = {
      title: 'new meet',
      createdBy: 1,
      users: [31, 92],
    };
    return request(app.getHttpServer())
      .post('/meets')
      .send(createMeetDto)
      .expect(400)
      .expect({ message: 'Invalid user was added', error: 'Bad Request', statusCode: 400 });
  });

  it('Create meet - invalid createdBy', () => {
    const createMeetDto: CreateMeetDto = {
      title: 'new meet',
      createdBy: 31,
      users: [2, 1],
    };
    return request(app.getHttpServer())
      .post('/meets')
      .send(createMeetDto)
      .expect(400)
      .expect({ message: 'Invalid createdBy', error: 'Bad Request', statusCode: 400 });
  });

  it('Get meet by id', () => {
    return request(app.getHttpServer())
      .get('/meets/1')
      .expect(200)
      .expect({ id: 1, title: 'seed meet', userNames: ['Marijn'] });
  });

  it('Get meets by user', () => {
    return request(app.getHttpServer())
      .get('/meets/by-user/1')
      .expect(200)
      .expect([
        { id: 1, title: 'seed meet' },
        { id: 2, title: 'new meet' },
      ]);
  });
});
