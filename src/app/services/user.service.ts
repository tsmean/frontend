import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {UtilsService} from './utils.service';
import {environment} from '../../environments/environment';
import {User} from '../../../../backend/src/db/user.model';

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

  login(email: string, password: string) {
    this.http.post(this.loginApi, {email: email, password: password}).toPromise().then(resp => {
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
