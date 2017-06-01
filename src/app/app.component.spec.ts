import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {TopnavComponent} from './topnav/topnav.component';
import {NotifyComponent} from './notify/notify.component';
import {MdButtonModule, MdCardModule, MdIconModule, MdInputModule} from '@angular/material';
import {NotifyService} from './notify.service';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {SignupPageComponent} from './signup-page/signup-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HeroWrapperComponent} from './hero-wrapper/hero-wrapper.component';
import {SpacerComponent} from './spacer/spacer.component';
import {JumbotronComponent} from './jumbotron/jumbotron.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {DisplayHeroListComponent} from './display-hero-list/display-hero-list.component';
import {DisplayHeroComponent} from './display-hero/display-hero.component';
import {DeleteHeroComponent} from './delete-hero/delete-hero.component';
import {CreateHeroComponent} from './create-hero/create-hero.component';
import {ResourceService} from './resource.service';
import {HeroService} from 'app/hero.service';
import {UtilsService} from './utils.service';
import {BroadcastService} from './broadcast.service';
import {UserService} from './user.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        ResourceService,
        HeroService,
        UtilsService,
        BroadcastService,
        UserService,
        NotifyService
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        MdInputModule,
        MdButtonModule,
        MdCardModule,
        MdIconModule
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
        SignupPageComponent,
        JumbotronComponent,
        SpacerComponent,
        LoginComponent,
        HeroWrapperComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.testvariable).toEqual('app works!');
  }));

});
