import { Injectable } from '@angular/core';
import {ResourceName, ResourceService} from "./resource.service";
import {Hero} from "./hero";
import {Observable} from "rxjs";

@Injectable()
export class HeroService {

  constructor(
      private resourceService: ResourceService
  ) { }

  private get resourceName (): ResourceName {
    return 'heroes'
  }

  getHeros(): Promise<Observable<Hero>[]> {
    return this.resourceService.getResources(this.resourceName);
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.resourceService.createResource(hero, this.resourceName);
  }

  deleteHero(heroId: string): Promise<Object> {
    return this.resourceService.deleteResource(heroId, this.resourceName);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.resourceService.updateResource(hero, this.resourceName);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
