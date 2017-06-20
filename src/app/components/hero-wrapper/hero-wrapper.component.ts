import { Component, OnInit } from '@angular/core';
import {EmittedEvent} from '../../models/emitted-event';
import {Hero} from '../../models/hero';
import {HeroService} from '../../services/hero.service';
import {BroadcastService} from '../../services/broadcast.service';

@Component({
  selector: 'app-hero-wrapper',
  templateUrl: './hero-wrapper.component.html',
  styleUrls: ['./hero-wrapper.component.css']
})
export class HeroWrapperComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
      private heroService: HeroService,
      private broadcast: BroadcastService
  ) {}


  ngOnInit() {

    // set up listeners
    this.broadcast.heroList.deleteHero.subscribe(evt => {
      this.heroes = this.heroes.filter(hero => hero.uid !== evt.heroId);
    });

    // get heroes
    this.heroService.getHeros().then(heroes => {
      this.heroes = heroes;
    }, errorResp => {
      console.error('something went wrong when getting heroes:', errorResp);
    });

  }

  public appendToList(evt: EmittedEvent) {
    this.heroes.push(evt.value);
  }


}
