import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {User} from './user';
import {environment} from '../environments/environment';
import {UtilsService} from './utils.service';

@Injectable()
export class UserService {

  constructor(
      private http: Http,
      private utils: UtilsService
  ) { }

  private get loginApi(): string {
    return this.utils.urlJoin(environment.api, 'login');
  }

  private get userApi(): string {
    return this.utils.urlJoin(environment.api, 'users');
  }

  login(username: string, password: string) {
    this.http.get(this.loginApi).toPromise().then(resp => {
      console.log(resp);
    });
  }

  createUser(user: User, password: string): Promise<any> {
    return this.http.post(this.userApi, {
      user: user,
      password: password
    }).toPromise();
  }


}
