import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {LandingComponent} from "../landing/landing.component";
import {SignupPageComponent} from "../signup-page/signup-page.component";
import {LoginComponent} from "../login/login.component";

const appRoutes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupPageComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule,

  ],
  providers: []
})
export class AppRoutingModule { }