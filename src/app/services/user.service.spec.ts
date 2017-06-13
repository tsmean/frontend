import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import {AppRoutingModule} from '../app-routing/app-routing.module';
import {LandingComponent} from '../components/landing/landing.component';
import {LoginComponent} from '../components/login/login.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {SignUpComponent} from '../components/sign-up/sign-up.component';
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';
import {HeroWrapperComponent} from '../components/hero-wrapper/hero-wrapper.component';
import {SpacerComponent} from '../components/spacer/spacer.component';
import {JumbotronComponent} from '../components/jumbotron/jumbotron.component';
import {NotifyComponent} from '../components/notify/notify.component';
import {TopnavComponent} from '../components/topnav/topnav.component';
import {DisplayHeroListComponent} from '../components/display-hero-list/display-hero-list.component';
import {DisplayHeroComponent} from '../components/display-hero/display-hero.component';
import {DeleteHeroComponent} from '../components/delete-hero/delete-hero.component';
import {CreateHeroComponent} from '../components/create-hero/create-hero.component';
import {AppComponent} from '../app.component';
import {UtilsService} from './utils.service';
import {UserService} from './user.service';
import {NotifyService} from './notify.service';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {
  MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdMenuModule,
  MdToolbarModule
} from '@angular/material';
import {ResourceService} from './resource.service';
import {HeroService} from './hero.service';
import {BroadcastService} from './broadcast.service';
import {APP_BASE_HREF} from '@angular/common';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
      providers: [
        ResourceService,
        HeroService,
        UtilsService,
        BroadcastService,
        UserService,
        NotifyService,
        { provide: APP_BASE_HREF, useValue: '/' }
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
        MdToolbarModule,
        MdMenuModule,
        MdIconModule
      ]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
