import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AufgabenEditorComponent } from './aufgaben-editor.component';

describe('AufgabenEditorComponent', () => {
  let component: AufgabenEditorComponent;
  let fixture: ComponentFixture<AufgabenEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AufgabenEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AufgabenEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
