import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {UtilsService} from './utils.service';
import {environment} from '../../environments/environment';
import {User} from '../../../../backend/src/db/user.model';
import {NotifyService} from './notify.service';
import {feutils} from './utils';
import {appCookies} from './cookies';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  private user: User;

  constructor(
    private http: Http,
    private utils: UtilsService,
    private notifyService: NotifyService,
    private router: Router
  ) { }

  logIn(email: string, password: string) {
    this.http.post(this.loginApi, {email: email, password: password}).toPromise()
      .then(resp => {
        console.log('happeningg');
        this.notifyService.success('logged in');
        appCookies.setCookie('username', email);
        this.router.navigate(['/dashboard']);
      })
      .catch(errorResp => {
        this.notifyService.error(errorResp.statusText);
      });
  }

  logOut() {
    appCookies.setUserCookie('');
    this.router.navigate(['/']);
  }

  createUser(user: User, password: string): Promise<any> {
    return this.http.post(this.userApi, {
      user: user,
      password: password
    }).toPromise();
  }

  private get loginApi(): string {
    return this.utils.urlJoin(environment.api, 'login');
  }

  private get userApi(): string {
    return this.utils.urlJoin(environment.api, 'users');
  }


}
