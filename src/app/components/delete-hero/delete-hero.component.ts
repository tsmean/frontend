import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../models/hero';
import {HeroService} from '../../services/hero.service';
import {BroadcastService} from '../../services/broadcast.service';

@Component({
  selector: 'app-delete-hero',
  templateUrl: './delete-hero.component.html',
  styleUrls: ['./delete-hero.component.css']
})
export class DeleteHeroComponent implements OnInit {

  @Input()
  hero: Hero;

  constructor(
    private heroService: HeroService,
    private broadcast: BroadcastService
  ) { }

  ngOnInit() {
  }

  public deleteHero() {
    this.heroService.deleteHero(this.hero.uid).then(resp => {
      this.broadcast.heroList.deleteHero.emit({
        heroId: this.hero.uid
      });
    });
  }


}
