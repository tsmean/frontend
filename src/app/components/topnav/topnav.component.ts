import { Component, OnInit } from '@angular/core';
import {appCookies} from '../../services/cookies';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  loggedIn(): boolean {
    return appCookies.userCookiePresent();
  }

  logOut() {
    console.log('logging out')
    this.userService.logOut();
  }

  ngOnInit() {
  }

}
