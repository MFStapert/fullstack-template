import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BlogController } from './controllers/blog.controller';
import { PostService } from './controllers/post.service';
import { UserService } from './controllers/user.service';

@Module({
  controllers: [BlogController],
  providers: [PrismaService, PostService, UserService],
})
export class BlogModule {}
