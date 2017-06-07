import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawLinearFunctionComponent } from './draw-linear-function.component';

describe('DrawLinearFunctionComponent', () => {
  let component: DrawLinearFunctionComponent;
  let fixture: ComponentFixture<DrawLinearFunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawLinearFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawLinearFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
