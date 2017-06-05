import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LnTopnavComponent } from './ln-topnav.component';

describe('LnTopnavComponent', () => {
  let component: LnTopnavComponent;
  let fixture: ComponentFixture<LnTopnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LnTopnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LnTopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
