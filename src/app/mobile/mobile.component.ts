import { Component, OnInit } from '@angular/core';
import {StoreService} from '../services/store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  loading = true;

  constructor(
    private store: StoreService,
    private router: Router
  ) { }


  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

}
