import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LehrpersonEinladenComponent } from './lehrperson-einladen.component';

describe('LehrpersonEinladenComponent', () => {
  let component: LehrpersonEinladenComponent;
  let fixture: ComponentFixture<LehrpersonEinladenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LehrpersonEinladenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LehrpersonEinladenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
