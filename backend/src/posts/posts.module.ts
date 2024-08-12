import { schema } from '@db/schema';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';

@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      tag: 'POSTS',
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
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
