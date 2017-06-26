import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotifyService} from '../../services/notify.service';
import {AppNotification} from '../../models/notification';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit, OnDestroy {

  public notification: AppNotification;

  private onDestroyStarted: Subject<void> = new Subject<void>();

  public hidden;

  constructor(
    private notifyService: NotifyService
  ) {}

  ngOnInit() {

    this.notifyService.notifications.takeUntil(this.onDestroyStarted).subscribe(notification => {
      this.notification = notification;

      this.hidden = false;

      let somethinElseHappened = false;
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

    });
  }

  removeNotification() {
    this.hidden = true;
    setTimeout(() => {
      this.notification = undefined;
    }, 300);
  }

  ngOnDestroy() {
    this.onDestroyStarted.next();
  }

}
