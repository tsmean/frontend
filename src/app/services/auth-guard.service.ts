import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {appCookies} from './cookies';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const url = state.url;
    const forbiddenWhenLoggedOut = ['/dashboard'];
    const forbiddenWhenLoggedIn = ['/login', '/signup', '/'];
    const isLoggedIn = appCookies.userCookiePresent();

    if (isLoggedIn && forbiddenWhenLoggedIn.indexOf(url) > -1) {
      this.router.navigate(['/dashboard']);
      return false;
    } else if (!isLoggedIn && forbiddenWhenLoggedOut.indexOf(url) > -1) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }

  }

}
