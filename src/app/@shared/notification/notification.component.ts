import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy } from '@angular/core';
import { NotificationStates } from '@models/enums';
import { INotification } from '@models/interfaces/INotification';
import { NotificationService } from '@services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tpp-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['notification.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-60px)' }),
        animate('0.5s ease-out', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('0.5s ease-out', style({ transform: 'translateY(-90px)' })),
      ]),
    ]),
  ],
})
export class NotificationComponent implements INotification, OnDestroy {
  @Input() closable = true;
  @Input() show = false;
  @Input() state: NotificationStates;
  @Input() message: string;

  notificationSubscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.notificationSubscription =
      this.notificationService.notification$.subscribe((res) => {
        this.show = true;
        this.message = res.message;
        this.state = res.state;
      });
  }

  ngOnDestroy(): void {
    this.notificationSubscription?.unsubscribe();
  }

  closeNotification() {
    this.show = false;
  }
}
