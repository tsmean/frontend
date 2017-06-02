import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from '../components/landing/landing.component';
import {LoginComponent} from '../components/login/login.component';
import {SignupPageComponent} from '../components/signup-page/signup-page.component';
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';

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
