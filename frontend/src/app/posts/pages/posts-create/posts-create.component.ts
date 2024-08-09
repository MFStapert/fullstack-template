import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultApiFactory } from '@generated/api/default-api';
import { PostsFormComponent } from '../../components/posts-form/posts-form.component';

@Component({
  selector: 'app-posts-create',
  standalone: true,
  imports: [PostsFormComponent, ReactiveFormsModule],
  templateUrl: './posts-create.component.html',
})
export class PostsCreateComponent {
  api = DefaultApiFactory();

  postsForm = inject(NonNullableFormBuilder).group({
    title: ['', [Validators.required]],
    content: [''],
  });

  async submitForm() {
    const post = {
      title: this.postsForm.controls.title.value,
      content: this.postsForm.controls.content.value,
    };
    await this.api.createPost({ createPostDto: post });
    this.postsForm.reset();
  }
}
