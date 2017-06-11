import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {StoreService} from './services/store.service';

import {appCookies} from './services/cookies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  testvariable = 'app works!';
  isBorderlessPage: boolean;
  counter = 0;

  constructor(
    router: Router,
    private store: StoreService
  ) {
    const handleRouteChange = () => {
      router.events.subscribe(newRoute => {
        if (newRoute instanceof NavigationEnd) {

          // Decide which pages get a border and which not
          const borderlessPages = ['/'];
          this.isBorderlessPage = borderlessPages.indexOf(newRoute.urlAfterRedirects) > -1;

          // If not on mobile, then set mobile to false, else set it to true
          if (newRoute.urlAfterRedirects.indexOf('mobile') > -1) {
            this.store.mobileView.setMobileView(true);
          } else {
            this.store.mobileView.setMobileView(false);
          }

        }
      });
    };
    handleRouteChange();

  }


}
