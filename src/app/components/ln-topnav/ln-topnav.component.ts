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
    private router: Router
  ) { }

  ngOnInit() {
  }

  toggleMobileView () {
    if (this.router.url.indexOf('mobile') > -1) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/mobile'], {queryParams: {state: this.router.url.substring(1, this.router.url.length)}});
    }
  }

}
