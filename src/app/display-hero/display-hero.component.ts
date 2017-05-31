import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Hero} from "../hero";
import {HeroSettings} from "../hero-settings";
import {EmittedEvent} from "../emitted-event";
import {UtilsService} from "../utils.service";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-display-hero',
  templateUrl: './display-hero.component.html',
  styleUrls: ['./display-hero.component.css']
})
export class DisplayHeroComponent implements OnChanges, OnInit {

  constructor(
      private utilsService: UtilsService,
      private heroService: HeroService
  ) { }

  @Input()
  hero: Hero;

  heroCopy: Hero;

  ngOnInit() {
    this.resetCopy();
  }

  ngOnChanges(changes: SimpleChanges) {
      this.resetCopy();
  }


  heroSettings: HeroSettings = {
    isBeingEdited: false
  };


  toggleEditable() {
    this.heroSettings.isBeingEdited = !this.heroSettings.isBeingEdited;
  }

  updateHero() {
    this.heroService.updateHero(this.heroCopy).subscribe(hero => {
      this.hero = hero;
      this.toggleEditable();
    });
  }

  resetCopy() {
      this.heroCopy = this.utilsService.deepCopyData(this.hero);
  }

}
