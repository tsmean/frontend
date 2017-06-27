import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {NotifyService} from 'notify-angular2';
import {UserService} from '../../services/user.service';
import {MdButtonModule, MdCardModule, MdIconModule, MdInputContainer, MdInputModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {UtilsService} from '../../services/utils.service';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {AppComponent} from '../../app.component';
import {CreateHeroComponent} from '../create-hero/create-hero.component';
import {DeleteHeroComponent} from '../delete-hero/delete-hero.component';
import {DisplayHeroComponent} from '../display-hero/display-hero.component';
import {DisplayHeroListComponent} from '../display-hero-list/display-hero-list.component';
import {TopnavComponent} from '../topnav/topnav.component';
import {NotifyComponent} from 'notify-angular2';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {LandingComponent} from '../landing/landing.component';
import {JumbotronComponent} from '../jumbotron/jumbotron.component';
import {SpacerComponent} from '../spacer/spacer.component';
import {LoginComponent} from '../login/login.component';
import {HeroWrapperComponent} from '../hero-wrapper/hero-wrapper.component';
import {AppRoutingModule} from '../../app-routing/app-routing.module';
import {APP_BASE_HREF} from '@angular/common';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        UserService,
        NotifyService,
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
      declarations: [
        AppComponent,
        CreateHeroComponent,
        DeleteHeroComponent,
        DisplayHeroComponent,
        DisplayHeroListComponent,
        TopnavComponent,
        SignUpComponent,
        NotifyComponent,
        PageNotFoundComponent,
        LandingComponent,
        JumbotronComponent,
        SpacerComponent,
        LoginComponent,
        HeroWrapperComponent,
        DashboardComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MdInputModule,
        MdButtonModule,
        MdCardModule,
        MdIconModule,
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Sign Up');
  }));

});
