import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostDto } from '../dto/post.dto';
import { PostsService } from '../services/posts.service';

@Controller()
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('posts/:id')
  async getPostById(@Param('id') id: number): Promise<PostDto> {
    return this.postService.post(id);
  }

  @Get('posts')
  async getPosts(): Promise<PostDto[]> {
    return this.postService.posts();
  }

  @Post('posts')
  async createPost(@Body() post: CreatePostDto): Promise<PostDto> {
    return this.postService.createPost(post);
  }

  @Put('posts/:id')
  async updatePost(@Param('id') id: number, @Body() post: PostDto): Promise<PostDto> {
    return this.postService.updatePost(id, post);
  }

  @Delete('posts/:id')
  async deletePost(@Param('id') id: number): Promise<PostDto> {
    return this.postService.deletePost(id);
  }
}
