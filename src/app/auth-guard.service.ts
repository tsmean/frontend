import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = false; // ... your login logic here
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
