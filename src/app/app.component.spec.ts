import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import {ResourceService} from './services/resource.service';
import {HeroService} from './services/hero.service';
import {UtilsService} from './services/utils.service';
import {BroadcastService} from './services/broadcast.service';
import {UserService} from './services/user.service';
import {NotifyService} from 'notify-angular';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {MdButtonModule, MdCardModule, MdIconModule, MdInputModule} from '@angular/material';
import {CreateHeroComponent} from './components/create-hero/create-hero.component';
import {DeleteHeroComponent} from './components/delete-hero/delete-hero.component';
import {DisplayHeroComponent} from './components/display-hero/display-hero.component';
import {DisplayHeroListComponent} from './components/display-hero-list/display-hero-list.component';
import {TopnavComponent} from './components/topnav/topnav.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {NotifyComponent} from 'notify-angular';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LandingComponent} from './components/landing/landing.component';
import {JumbotronComponent} from './components/jumbotron/jumbotron.component';
import {SpacerComponent} from './components/spacer/spacer.component';
import {LoginComponent} from './components/login/login.component';
import {HeroWrapperComponent} from './components/hero-wrapper/hero-wrapper.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

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
        JumbotronComponent,
        SpacerComponent,
        LoginComponent,
        HeroWrapperComponent,
        DashboardComponent
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
