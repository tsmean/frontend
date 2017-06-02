import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageComponent } from './signup-page.component';
import {UtilsService} from '../../services/utils.service';
import {UserService} from '../../services/user.service';
import {NotifyService} from '../../services/notify.service';
import {SignUpComponent} from '../sign-up/sign-up.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdButtonModule, MdCardModule, MdIconModule, MdInputModule} from '@angular/material';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        UserService,
        NotifyService
      ],
      declarations: [
        SignupPageComponent,
        SignUpComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MdInputModule,
        MdButtonModule,
        MdCardModule,
        MdIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
