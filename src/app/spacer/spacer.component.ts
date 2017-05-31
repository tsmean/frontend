import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.css']
})
export class SpacerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() height;

  get getHeight(): string {
    return this.height ? this.height + 'px' : '10px';
  }

}
