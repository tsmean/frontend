import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EinstufungstestComponent } from './einstufungstest.component';

describe('EinstufungstestComponent', () => {
  let component: EinstufungstestComponent;
  let fixture: ComponentFixture<EinstufungstestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EinstufungstestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstufungstestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
