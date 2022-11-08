import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ES_CALENDAR } from '@models/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'tpp-template';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      ...ES_CALENDAR,
    });

    this.primengConfig.ripple = true;
  }
}
