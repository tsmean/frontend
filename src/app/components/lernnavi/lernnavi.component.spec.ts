import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LernnaviComponent } from './lernnavi.component';

describe('LernnaviComponent', () => {
  let component: LernnaviComponent;
  let fixture: ComponentFixture<LernnaviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LernnaviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LernnaviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
