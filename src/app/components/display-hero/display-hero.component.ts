import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Hero} from '../../models/hero';
import {HeroSettings} from '../../models/hero-settings';
import {UtilsService} from '../../services/utils.service';
import {HeroService} from '../../services/hero.service';

@Component({
  selector: 'app-display-hero',
  templateUrl: './display-hero.component.html',
  styleUrls: ['./display-hero.component.css']
})
export class DisplayHeroComponent implements OnChanges, OnInit {


  @Input()
  hero: Hero = {};

  heroCopy: Hero;

  heroSettings: HeroSettings = {
    isBeingEdited: false
  };

  constructor(
      private utilsService: UtilsService,
      private heroService: HeroService
  ) { }

  ngOnInit() {
    this.resetCopy();
  }

  ngOnChanges(changes: SimpleChanges) {
      this.resetCopy();
  }


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
