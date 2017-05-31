import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {BroadcastService} from "../broadcast.service";

@Component({
  selector: 'app-delete-hero',
  templateUrl: './delete-hero.component.html',
  styleUrls: ['./delete-hero.component.css']
})
export class DeleteHeroComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private broadcast: BroadcastService
  ) { }

  ngOnInit() {
  }

  @Input()
  hero: Hero;

  public deleteHero() {
    this.heroService.deleteHero(this.hero.uid).then(resp => {
      this.broadcast.heroList.deleteHero.emit({
        heroId: this.hero.uid
      });
    });
  }


}
