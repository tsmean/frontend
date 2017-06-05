import { Component, OnInit } from '@angular/core';
import {BroadcastService} from '../../services/broadcast.service';

@Component({
  selector: 'app-ln-topnav',
  templateUrl: './ln-topnav.component.html',
  styleUrls: ['./ln-topnav.component.css']
})
export class LnTopnavComponent implements OnInit {

  mobileView = false;

  constructor(
    private broadcast: BroadcastService
  ) { }

  ngOnInit() {
  }

  toggleMobileView () {
    this.mobileView = !this.mobileView;
    this.broadcast.app.toggleMobileView.next();
  }

}
