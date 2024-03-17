import { Component } from '@angular/core';

@Component({
  selector: 'ui-test',
  standalone: true,
  template: `<h1 data-testId="hello-world"><ng-content></ng-content></h1>`,
})
export class TestComponent {}
