import { Component, OnInit } from '@angular/core';
import {NotifyService} from "../notify.service";

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  constructor(
      private notifyService: NotifyService
  ) { }

  ngOnInit() {
  }

  doStart() {
    this.notifyService.success('Nothing happens. Yet!')
  }

}
