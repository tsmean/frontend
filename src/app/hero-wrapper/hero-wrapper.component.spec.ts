import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroWrapperComponent } from './hero-wrapper.component';

describe('HeroWrapperComponent', () => {
  let component: HeroWrapperComponent;
  let fixture: ComponentFixture<HeroWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
