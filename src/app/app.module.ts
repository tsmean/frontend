import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ResourceService} from './services/resource.service';
import {HeroService} from './services/hero.service';
import {UtilsService} from './services/utils.service';
import {BroadcastService} from './services/broadcast.service';
import {UserService} from './services/user.service';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {CreateHeroComponent} from './components/create-hero/create-hero.component';
import {DeleteHeroComponent} from './components/delete-hero/delete-hero.component';
import {DisplayHeroComponent} from './components/display-hero/display-hero.component';
import {DisplayHeroListComponent} from './components/display-hero-list/display-hero-list.component';
import {TopnavComponent} from './components/topnav/topnav.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LandingComponent} from './components/landing/landing.component';
import {JumbotronComponent} from './components/jumbotron/jumbotron.component';
import {SpacerComponent} from './components/spacer/spacer.component';
import {LoginComponent} from './components/login/login.component';
import {HeroWrapperComponent} from './components/hero-wrapper/hero-wrapper.component';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdInputModule, MdCardModule, MdButtonModule, MdToolbarModule, MdMenuModule,
  MdIconModule
} from '@angular/material';
import 'hammerjs';
import {StoreService} from './services/store.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { NotifyModule } from 'notify-angular';

@NgModule({
  declarations: [
    AppComponent,
    CreateHeroComponent,
    DeleteHeroComponent,
    DisplayHeroComponent,
    DisplayHeroListComponent,
    TopnavComponent,
    SignUpComponent,
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
    AppRoutingModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    NotifyModule.forRoot()
  ],
  providers: [
    ResourceService,
    HeroService,
    UtilsService,
    BroadcastService,
    UserService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
