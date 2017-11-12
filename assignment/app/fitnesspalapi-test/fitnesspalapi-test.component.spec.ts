import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnesspalapiTestComponent } from './fitnesspalapi-test.component';

describe('FitnesspalapiTestComponent', () => {
  let component: FitnesspalapiTestComponent;
  let fixture: ComponentFixture<FitnesspalapiTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnesspalapiTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnesspalapiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
