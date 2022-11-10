import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@services';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.success('Good');
  }

  // @BlockUI() blockUI: NgBlockUI;

  // constructor(
  //   private activatedRoute: ActivatedRoute,
  //   private userDataService: UserDataService,
  //   private notificationService: NotificationService
  // ) {}

  // ngOnInit(): void {
  //   this.blockUI.start('Espere...');

  //   const rawToken = this.activatedRoute.snapshot.paramMap.get('token');
  //   const refreshToken =
  //     this.activatedRoute.snapshot.paramMap.get('refreshToken');
  //   const userId = this.activatedRoute.snapshot.paramMap.get('userId');

  //   this.blockUI.stop();

  //   if (rawToken && refreshToken && userId) {
  //     this.userDataService.setToken(rawToken);
  //     this.userDataService.setUser(userId);
  //     this.userDataService.setRefreshToken(refreshToken);
  //   }

  //   this.notificationService.warn(NO_TOKEN_MESSAGE);
  // }
}
