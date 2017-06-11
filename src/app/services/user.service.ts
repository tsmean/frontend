import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {UtilsService} from './utils.service';
import {environment} from '../../environments/environment';
import {User} from '../../../../backend/src/db/user.model';
import {NotifyService} from './notify.service';
import {feutils} from './utils';
import {appCookies} from './cookies';

@Injectable()
export class UserService {

  private user: User;

  constructor(
    private http: Http,
    private utils: UtilsService,
    private notifyService: NotifyService
  ) { }

  logIn(email: string, password: string) {
    this.http.post(this.loginApi, {email: email, password: password}).toPromise()
      .then(resp => {
        this.notifyService.success('logged in');
        appCookies.setCookie('username', email);
        console.log(resp);
      })
      .catch(errorResp => {
        console.error(errorResp);

        // TODO: only for testing, remove later:
        appCookies.setCookie('username', email);

        this.notifyService.error(errorResp.statusText);
      });
  }

  logOut() {

    console.log('logging out 2')
    this.user = feutils.undef;
    appCookies.setUserCookie('');
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
