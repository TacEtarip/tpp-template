import { NotificationStates } from '@models/enums';

export interface INotification {
  state: NotificationStates;
  message: string;
  show: boolean;
}
