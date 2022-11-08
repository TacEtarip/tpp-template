import { Injectable } from '@angular/core';
import { NotificationStates } from '@models/enums';
import { INotification } from '@models/interfaces/INotification';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notification = new Subject<INotification>();
  notification$ = this.notification.asObservable();

  showNotification(state: NotificationStates, message: string) {
    this.notification.next({
      state,
      message,
      show: true,
    });
  }

  error(message: string) {
    this.notification.next({
      state: 2,
      show: true,
      message,
    });
  }

  warn(message: string) {
    this.notification.next({
      state: 1,
      show: true,
      message,
    });
  }

  success(message: string) {
    this.notification.next({
      state: 0,
      show: true,
      message,
    });
  }
}
