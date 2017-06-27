import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {NotifyService} from 'notify-angular2';
import {appCookies} from '../../services/cookies';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  newUser = {
    email: undefined,
    uid: undefined
  };

  password = '';

  constructor(
      private userService: UserService,
      private notifyService: NotifyService,
      private router: Router
  ) { }

  doSignUp() {
    this.userService.createUser(this.newUser, this.password).then(resp => {
      this.notifyService.success('User created');
      appCookies.setUserCookie(this.newUser.email);
      this.router.navigate(['/dashboard']);
    }, errorResp => {

      if (errorResp.status === 404) {
        // ONLY for demo purposes
        this.userService.logIn(this.newUser.email, this.password);
      } else {
        this.notifyService.error(errorResp.statusText);
      }

    });
  }

}
