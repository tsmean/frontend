import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotifyService} from "../notify.service";
import {AppNotification} from "../notification";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit, OnDestroy {

  constructor(
      private notifyService: NotifyService
  ) {}

  public hidden;

  ngOnInit() {

    this.notifyService.notifications.takeUntil(this.onDestroyStarted).subscribe(notification => {
      this.notification = notification;

      this.hidden = false;

      let somethinElseHappened: boolean = false;
      const timer = Observable.timer(notification.timer);
      const innerSubscription = this.notifyService
          .notifications
          .takeUntil(timer)
          .subscribe(newNotification => {
            somethinElseHappened = true;
          });

      setTimeout(() => {
        if (!somethinElseHappened) {
          this.removeNotification();
        }
      }, notification.timer);

    })
  }

  removeNotification() {
    this.hidden = true;
    setTimeout(() => {
      this.notification = undefined;
    }, 300)
  }

  private onDestroyStarted: Subject<void> = new Subject<void>();
  ngOnDestroy() {
    this.onDestroyStarted.next();
  }

  public notification: AppNotification;


}
