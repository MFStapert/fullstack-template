import { Component } from '@angular/core';
import { TestComponent } from '@common/ui/test/test.component';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [TestComponent],
  template: '<common-test>{{helloWorld}}</common-test>',
})
export class AppComponent {
  helloWorld = 'hello cms';
}
