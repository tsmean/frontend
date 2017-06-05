import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AufgabentypenComponent } from './aufgabentypen.component';

describe('AufgabentypenComponent', () => {
  let component: AufgabentypenComponent;
  let fixture: ComponentFixture<AufgabentypenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AufgabentypenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AufgabentypenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
