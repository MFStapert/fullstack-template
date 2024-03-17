import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TestComponent} from "@ui/test/test.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TestComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges()

    const testComponent = fixture.nativeElement.querySelector('h1')
    expect(testComponent.textContent).toContain(app.helloWorld)
  });
});
