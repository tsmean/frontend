import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class StoreService {

  mobileView = {
    mobileView: new BehaviorSubject(false),
    toggleMobileView: () => {
      this.mobileView.mobileView.next(!this.mobileView.mobileView.getValue());
    }
  };

  constructor() { }



}
