import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultApiFactory } from '@generated/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf],
  template: `
    <h1>MyApp</h1>
    <div *ngIf="helloWorld()" data-testid="frontend">{{ helloWorld() }}</div>
  `,
})
export class AppComponent implements OnInit {
  api = DefaultApiFactory();
  helloWorld = signal('');

  async ngOnInit() {
    const response = await this.api.getHello();
    this.helloWorld.set(response.data);
  }
}
