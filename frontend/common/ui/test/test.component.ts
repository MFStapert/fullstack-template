import { Component } from '@angular/core';

@Component({
  selector: 'common-test',
  standalone: true,
  template: ` <h1 data-testId="hello-world">
    <ng-content></ng-content>
  </h1>`,
})
export class TestComponent {}
