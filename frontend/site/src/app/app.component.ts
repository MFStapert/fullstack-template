import { Component } from '@angular/core';
import { TestComponent } from '@common/ui/test/test.component';

@Component({
  selector: 'site-root',
  standalone: true,
  imports: [TestComponent],
  template: '<common-test>{{helloWorld}}</common-test>',
})
export class AppComponent {
  helloWorld = 'hello site';
}
