import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KompetenzenUebersichtComponent } from './kompetenzen-uebersicht.component';

describe('KompetenzenUebersichtComponent', () => {
  let component: KompetenzenUebersichtComponent;
  let fixture: ComponentFixture<KompetenzenUebersichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KompetenzenUebersichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KompetenzenUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
