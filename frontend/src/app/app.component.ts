import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
  helloWorld = signal('');

  async ngOnInit() {
    const response = await fetch('http://localhost/api/hello');
    const json = await response.text();
    this.helloWorld.set(json);
  }
}
