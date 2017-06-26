import { Component, OnInit } from '@angular/core';
import {MathquillService} from 'mathquill-angular2';

@Component({
  selector: 'app-matheditor',
  templateUrl: './matheditor.component.html',
  styleUrls: ['./matheditor.component.scss']
})
export class MatheditorComponent implements OnInit {

  constructor(
    public mathquillService: MathquillService
  ) {
    mathquillService.mq.then(resp => {
      console.log(resp);
    });
  }

  ngOnInit() {
  }

}
