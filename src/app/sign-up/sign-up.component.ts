import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";
import {NotifyService} from "../notify.service";
import {HttpResponse} from "selenium-webdriver/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(
      private userService: UserService,
      private notifyService: NotifyService
  ) { }

  private newUser = {
    email: undefined,
    uid: undefined
  };
  private password = "";

  doSignUp() {
    this.userService.createUser(this.newUser, this.password).then(resp => {
      this.notifyService.success('User created');
    }, errorResp => {
      this.notifyService.error(errorResp.statusText);
    })
  }

}
