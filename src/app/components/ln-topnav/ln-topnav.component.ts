import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ln-topnav',
  templateUrl: './ln-topnav.component.html',
  styleUrls: ['./ln-topnav.component.css']
})
export class LnTopnavComponent implements OnInit {

  constructor(
    public store: StoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  toggleMobileView () {
    // TODO: it's a bit messy like that, maybe store route in app state instead of url?
    if (this.router.url.indexOf('mobile') > -1) {
      const stateParamEncodedLastState = this.activatedRoute.snapshot.queryParams.state;
      const backState = '/' + (stateParamEncodedLastState ? stateParamEncodedLastState : '');
      this.router.navigate([backState]);
    } else {
      const state = this.router.url.substring(1, this.router.url.length);
      const stateParams = state ? {queryParams: {state: state}} : undefined;
      this.router.navigate(['/mobile'], stateParams);
    }
  }

}
