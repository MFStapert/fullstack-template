import { NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { DefaultApiFactory } from '@generated/api/default-api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  api = DefaultApiFactory();
  helloWorld = signal('Static val');

  async ngOnInit() {
    const helloWorldResponse = await this.api.getHello();
    this.helloWorld.set(helloWorldResponse.data);
  }
}
