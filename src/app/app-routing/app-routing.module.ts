import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from '../components/landing/landing.component';
import {LoginComponent} from '../components/login/login.component';
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';
import {SignUpComponent} from '../components/sign-up/sign-up.component';
import {HomeComponent} from '../home/home.component';
import {AuthGuardService} from '../auth-guard.service';
import {AdminComponent} from '../admin/admin.component';
import {DashboardComponent} from '../dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
