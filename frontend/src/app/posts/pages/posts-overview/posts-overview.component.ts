import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DefaultApiFactory } from '@generated/api/default-api';
import { PostDto } from '@generated/models';

@Component({
  selector: 'app-posts-overview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './posts-overview.component.html',
})
export class PostsOverviewComponent implements OnInit {
  api = DefaultApiFactory();
  posts = signal<PostDto[]>([]);

  async ngOnInit() {
    await this.getPosts();
  }

  async getPosts() {
    const posts = await this.api.getPosts();
    this.posts.set(posts.data);
  }

  async deletePost(id: number) {
    await this.api.deletePost({ id });
    await this.getPosts();
  }
}
