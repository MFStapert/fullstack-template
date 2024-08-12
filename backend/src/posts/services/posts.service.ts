import { posts, schema } from '@db/schema';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostDto } from '../dto/post.dto';

@Injectable()
export class PostsService {
  constructor(@Inject('POSTS') private db: PostgresJsDatabase<typeof schema>) {}

  async post(id: number) {
    return this.db.query.posts.findFirst({
      where: eq(posts.id, id),
    });
  }

  async posts() {
    return this.db.select().from(posts);
  }

  async createPost(data: CreatePostDto) {
    const newPost = await this.db.insert(posts).values(data).returning();
    return newPost[0];
  }

  async updatePost(id: number, data: PostDto) {
    const updatedPost = await this.db.update(posts).set(data).where(eq(posts.id, id)).returning();
    return updatedPost[0];
  }

  async deletePost(id: number) {
    const deletedPost = await this.db.delete(posts).where(eq(posts.id, id)).returning();
    return deletedPost[0];
  }
}
