import { Component, input, OnInit, signal } from '@angular/core';
import { DefaultApiFactory } from '@generated/api/default-api';
import { PostDto } from '@generated/models';

@Component({
  selector: 'app-posts-detail',
  standalone: true,
  imports: [],
  templateUrl: './posts-detail.component.html',
})
export class PostsDetailComponent implements OnInit {
  postId = input.required<string>();
  api = DefaultApiFactory();
  post = signal<PostDto | null>(null);

  async ngOnInit() {
    const post = await this.api.getPostById({ id: Number(this.postId()) });
    this.post.set(post.data);
  }
}
