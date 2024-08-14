import { Component, inject, input, OnInit } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultApiFactory } from '@generated/api/default-api';
import { PostsFormComponent } from '../../components/posts-form/posts-form.component';

@Component({
  selector: 'app-posts-update',
  standalone: true,
  imports: [FormsModule, PostsFormComponent, ReactiveFormsModule],
  templateUrl: './posts-update.component.html',
})
export class PostsUpdateComponent implements OnInit {
  postId = input.required<string>();
  api = DefaultApiFactory();
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  postsForm = inject(NonNullableFormBuilder).group({
    title: ['', [Validators.required]],
    content: [''],
  });

  async ngOnInit() {
    const post = await this.api.getPostById({ id: Number(this.postId()) });
    this.postsForm.setValue({
      title: post.data.title,
      content: post.data.content ?? '',
    });
  }

  async submitForm() {
    const post = {
      id: Number(this.postId()),
      title: this.postsForm.controls.title.value,
      content: this.postsForm.controls.content.value,
    };
    await this.api.updatePost({
      id: Number(this.postId()),
      postDto: {
        ...post,
      },
    });
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
