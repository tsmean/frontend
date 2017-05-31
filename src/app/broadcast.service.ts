import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BroadcastService {

  public heroList = {
    deleteHero: new EventEmitter()
  };
  constructor() { }

}
