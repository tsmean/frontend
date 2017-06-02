import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../models/hero';

@Component({
  selector: 'app-display-hero-list',
  templateUrl: './display-hero-list.component.html',
  styleUrls: ['./display-hero-list.component.css']
})
export class DisplayHeroListComponent implements OnInit {

  @Input()
  heroes: Hero[];

  constructor() { }

  ngOnInit() {

  }

}
