import { Component } from '@angular/core';
import { TestComponent } from '@ui/test/test.component';

@Component({
  selector: 'site-root',
  standalone: true,
  imports: [TestComponent],
  template: '<ui-test>{{helloWorld}}</ui-test>',
})
export class AppComponent {
  helloWorld = 'Hello site';
}
