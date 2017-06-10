import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: {
    email: string;
    password: string;
  } = {
    email: '',
    password: ''
  };

  doLogin() {
    this.userService.login(this.user.email, this.user.password);
  }

  constructor(
      private userService: UserService
  ) { }

  ngOnInit() {
  }

}
