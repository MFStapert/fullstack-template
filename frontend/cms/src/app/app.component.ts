import { Component, inject } from '@angular/core';
import { TestComponent } from '@common/ui/test/test.component';
import { BackendService } from '@common/data-access/backend.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [TestComponent, AsyncPipe],
  template: '<common-test>{{helloWorld|async}}</common-test>',
  providers: [BackendService],
})
export class AppComponent {
  backend = inject(BackendService);
  helloWorld = this.backend.getCms();
}
