import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input()
  text;

  @Input()
  link;

  @Input()
  icon;

  constructor() { }

  ngOnInit() {
  }



}
