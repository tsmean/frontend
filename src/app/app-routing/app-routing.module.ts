import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from '../components/landing/landing.component';
import {LoginComponent} from '../components/login/login.component';
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';
import {LernnaviComponent} from '../components/lernnavi/lernnavi.component';
import {SignUpComponent} from '../components/sign-up/sign-up.component';


const appRoutes: Routes = [
  { path: '', component: LernnaviComponent}, // modified this one
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: '**', component: PageNotFoundComponent }
];

const lernnaviRoutes: Routes = [
  { path: 'lernnavi', component: LernnaviComponent},
];
const insertArrayTwoIntoArrayOne = (a1, a2, insertPosition: number): void => {
  a1.splice.apply(a1, [insertPosition, 0].concat(a2));
};
insertArrayTwoIntoArrayOne(appRoutes, lernnaviRoutes, 0);

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
