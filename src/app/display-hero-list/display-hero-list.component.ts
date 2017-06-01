import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

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
