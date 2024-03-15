import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TestComponent} from "@ui/test/test.component";

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent],
  template: '<ui-test></ui-test>',
  styleUrl: './app.component.css'
})
export class AppComponent {}
