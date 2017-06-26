import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bla',
  templateUrl: './bla.component.html',
  styleUrls: ['./bla.component.scss']
})
export class BlaComponent implements OnInit {

  @Input()
  mytext: string;

  constructor() { }

  ngOnInit() {
  }

}
