import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Hero} from '../../models/hero';
import {HeroService} from '../../services/hero.service';
import {NotifyService} from '../../services/notify.service';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css']
})
export class CreateHeroComponent implements OnInit {

  public newHero: Hero;

  @Output()
  newHeroCreated = new EventEmitter();

  constructor(
      private heroService: HeroService,
      private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.newHero = {};
  }

  public createHero() {

    const heroObs = this.heroService.createHero(this.newHero);
    heroObs.then(resp => {
      this.notifyService.success('Hero Created');
      this.newHeroCreated.emit({
        value: resp
      });
    }, errorResp => {
      this.notifyService.error(errorResp.statusText);
    });

  }


}
