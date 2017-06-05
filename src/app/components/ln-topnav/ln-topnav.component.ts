import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-ln-topnav',
  templateUrl: './ln-topnav.component.html',
  styleUrls: ['./ln-topnav.component.css']
})
export class LnTopnavComponent implements OnInit {

  constructor(
    private store: StoreService
  ) { }

  ngOnInit() {
  }

  toggleMobileView () {
    this.store.mobileView.toggleMobileView();
  }

}
