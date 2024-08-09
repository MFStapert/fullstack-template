import { Component, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './posts-form.component.html',
})
export class PostsFormComponent {
  postForm = model.required<FormGroup>();
}
