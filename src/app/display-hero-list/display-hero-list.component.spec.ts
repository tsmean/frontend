import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHeroListComponent } from './display-hero-list.component';

describe('DisplayHeroListComponent', () => {
  let component: DisplayHeroListComponent;
  let fixture: ComponentFixture<DisplayHeroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayHeroListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayHeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
