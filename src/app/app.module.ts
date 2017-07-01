import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {UserService} from './services/user.service';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {TopnavComponent} from './components/topnav/topnav.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LandingComponent} from './components/landing/landing.component';
import {JumbotronComponent} from './components/jumbotron/jumbotron.component';
import {SpacerComponent} from './components/spacer/spacer.component';
import {LoginComponent} from './components/login/login.component';


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
import {createResourceModule} from '@tsmean/resource';
import {HeroModule} from '@tsmean/hero';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    SignUpComponent,
    PageNotFoundComponent,
    LandingComponent,
    JumbotronComponent,
    SpacerComponent,
    LoginComponent,
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
    NotifyModule.forRoot(),
    createResourceModule(environment.api),
    HeroModule.forRoot()
  ],
  providers: [
    UserService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
