import { INestApplication } from '@nestjs/common';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';
import request from 'supertest';
import { CreateVoteDto } from '../src/meet/dto/create.vote.dto';
import { MeetModule } from '../src/meet/meet.module';
import { createMeetFactory } from './factory/create-meet.factory';
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
    return request(app.getHttpServer())
      .post('/meets')
      .send(createMeetFactory())
      .expect(201)
      .expect({
        id: 2,
        title: 'new meet',
        finalized: false,
        createdBy: 1,
        userNames: ['Marijn', 'Yorick'],
      });
  });

  it('Create meet - invalid user', () => {
    return request(app.getHttpServer())
      .post('/meets')
      .send(createMeetFactory({ users: [31, 92] }))
      .expect(500);
  });

  it('Create meet - invalid createdBy', () => {
    return request(app.getHttpServer())
      .post('/meets')
      .send(createMeetFactory({ createdBy: 31 }))
      .expect(500);
  });

  it('Get meet by id', () => {
    return request(app.getHttpServer())
      .get('/meets/1')
      .expect(200)
      .expect({ id: 1, title: 'seed meet', finalized: false, createdBy: 1, userNames: ['Marijn'] });
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

  it('Create vote', () => {
    const voteDto: CreateVoteDto = {
      createdBy: 1,
      locationId: 1,
    };
    return request(app.getHttpServer()).post('/meets/1/vote').send(voteDto).expect(201);
  });

  it('Create vote - invalid match', () => {
    const voteDto: CreateVoteDto = {
      createdBy: 2,
      locationId: 1,
    };
    return request(app.getHttpServer()).post('/meets/1337/vote').send(voteDto).expect(500);
  });

  it('Create vote - invalid createdBy', () => {
    const voteDto: CreateVoteDto = {
      createdBy: 9001,
      locationId: 1,
    };
    return request(app.getHttpServer()).post('/meets/1/vote').send(voteDto).expect(500);
  });

  it('Create vote - invalid location', () => {
    const voteDto: CreateVoteDto = {
      createdBy: 2,
      locationId: 100,
    };
    return request(app.getHttpServer()).post('/meets/1/vote').send(voteDto).expect(500);
  });

  it('Create vote - finalize meet', async () => {
    await request(app.getHttpServer()).post('/meets').send(createMeetFactory());

    await request(app.getHttpServer())
      .post('/meets/2/vote')
      .send({
        createdBy: 1,
        locationId: 1,
      })
      .expect(201);
    await request(app.getHttpServer())
      .post('/meets/2/vote')
      .send({
        createdBy: 2,
        locationId: 1,
      })
      .expect(201);
    return request(app.getHttpServer())
      .get('/meets/2')
      .expect(200)
      .expect({
        id: 2,
        title: 'new meet',
        finalized: true,
        createdBy: 1,
        locationTitle: 'Ijssel',
        userNames: ['Marijn', 'Yorick'],
      });
  });

  it('Create vote - no duplicates', () => {
    const voteDto: CreateVoteDto = {
      createdBy: 1,
      locationId: 1,
    };
    return request(app.getHttpServer()).post('/meets/1/vote').send(voteDto).expect(500);
  });

  it('Get votes by match id', () => {
    return request(app.getHttpServer())
      .get('/meets/1/votes')
      .expect(200)
      .expect([{ createdBy: 1, locationId: 1 }]);
  });
});
