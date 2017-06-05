import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class StoreService {

  mobileView = {
    mobileView: new BehaviorSubject(
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 576 ? true : false
    ),
    toggleMobileView: () => {
      this.mobileView.mobileView.next(!this.mobileView.mobileView.getValue());
    },
    setMobileView: (val: boolean) => {
      this.mobileView.mobileView.next(val);
    }
  };


  constructor() { }



}
