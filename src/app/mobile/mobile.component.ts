import { Component, OnInit } from '@angular/core';
import {StoreService} from '../services/store.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  loading = true;
  queryParams: Params = {};
  baseUrl = '/';

  constructor(
    private store: StoreService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    router.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

  get mobileUrl() {
    const url = this.baseUrl + (this.queryParams.state ? this.queryParams.state : '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
