import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultApiFactory } from '@generated/api';
import { PostDto } from '@generated/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf],
  template: `
    <h1>MyApp</h1>
    <div *ngIf="helloWorld()" data-testid="frontend">{{ helloWorld() }}</div>
    <div *ngIf="post()">{{ post().title }}</div>
  `,
})
export class AppComponent implements OnInit {
  api = DefaultApiFactory();
  helloWorld = signal('Static val');
  post = signal<PostDto>({ id: 0, title: '' });

  async ngOnInit() {
    const helloWorldResponse = await this.api.getHello();
    this.helloWorld.set(helloWorldResponse.data);
    const postResponse = await this.api.getPostById({ id: '1' });
    this.post.set(postResponse.data);
  }
}
