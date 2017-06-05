import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LnPlanetComponent } from './ln-planet.component';

describe('LnPlanetComponent', () => {
  let component: LnPlanetComponent;
  let fixture: ComponentFixture<LnPlanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LnPlanetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LnPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
