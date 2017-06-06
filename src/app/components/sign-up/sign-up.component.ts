import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {NotifyService} from '../../services/notify.service';

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
      private notifyService: NotifyService
  ) { }

  doSignUp() {
    this.userService.createUser(this.newUser, this.password).then(resp => {
      this.notifyService.success('User created');
    }, errorResp => {
      this.notifyService.error(errorResp.statusText);
    });
  }

}
