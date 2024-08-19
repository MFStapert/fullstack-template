import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  // api = DefaultApiFactory();
  // helloWorld = signal('Static val');
  //
  // async ngOnInit() {
  //   const helloWorldResponse = await this.api.getHello();
  //   this.helloWorld.set(helloWorldResponse.data);
  // }
}
