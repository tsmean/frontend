import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AppNotification, NotifyOptions} from "./notification";


@Injectable()
export class NotifyService {

  constructor() {}

  success(message, options?: NotifyOptions) {
    this._notifications.next({
      type: 'success',
      message: message,
      color: options && options.color || '#3C763D',
      background: options && options.background || '#DFF0D8',
      timer: options && options.timer || 1500,
      transition: '1.5s',
      opacity: '1'
    });
  }

  error(message, options?: NotifyOptions) {
    this._notifications.next({
      type: 'error',
      message: message,
      color: options && options.color || '#A94442',
      background: options && options.background || '#F2DEDE',
      timer: options && options.timer || 3000,
      transition: '3s',
      opacity: '1'
    })
  }

  private _notifications: Subject<AppNotification> = new Subject();
  public get notifications() { //TODO: make this const somehow. static?
    return this._notifications;
  }


}
