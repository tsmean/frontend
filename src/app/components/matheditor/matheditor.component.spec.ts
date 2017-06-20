import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatheditorComponent } from './matheditor.component';

describe('MatheditorComponent', () => {
  let component: MatheditorComponent;
  let fixture: ComponentFixture<MatheditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatheditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatheditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
