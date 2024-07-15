import {Component,  OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  template: '<div data-testid="frontend">{{helloWorld()}}</div>',
})
export class AppComponent implements OnInit {
  helloWorld = signal('')

  async ngOnInit() {
    const response = await fetch('/api/cms');
    const json = await response.text();
    this.helloWorld.set(json)
  }


}
