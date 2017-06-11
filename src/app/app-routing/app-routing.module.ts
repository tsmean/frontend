import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found.component';
import {LernnaviComponent} from '../components/lernnavi/lernnavi.component';
import {SignUpComponent} from '../components/sign-up/sign-up.component';
import {EinstufungstestComponent} from '../components/einstufungstest/einstufungstest.component';
import {AufgabenEditorComponent} from '../components/aufgaben-editor/aufgaben-editor.component';
import {LehrpersonEinladenComponent} from '../components/lehrperson-einladen/lehrperson-einladen.component';
import {ForumComponent} from '../components/forum/forum.component';
import {KompetenzenUebersichtComponent} from '../components/kompetenzen-uebersicht/kompetenzen-uebersicht.component';
import {AufgabentypenComponent} from '../components/aufgabentypen/aufgabentypen.component';
import {MobileComponent} from '../mobile/mobile.component';
import {HomeComponent} from '../home/home.component';
import {AuthGuardService} from '../auth-guard.service';
import {AdminComponent} from '../admin/admin.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {LandingComponent} from '../components/landing/landing.component';


const appRoutes: Routes = [
  { path: '', component: LernnaviComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: '**', component: PageNotFoundComponent }
];

const lernnaviRoutes: Routes = [
  { path: 'lernnavi', component: LernnaviComponent},
  { path: 'einstufungstest', component: EinstufungstestComponent},
  { path: 'aufgaben-editor', component: AufgabenEditorComponent},
  { path: 'lehrperson-einladen', component: LehrpersonEinladenComponent},
  { path: 'forum', component: ForumComponent},
  { path: 'kompetenzen-uebersicht', component: KompetenzenUebersichtComponent},
  { path: 'aufgabentypen', component: AufgabentypenComponent},
  { path: 'mobile', component: MobileComponent},

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
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
