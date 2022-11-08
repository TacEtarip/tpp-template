import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['load-more.component.scss'],
})
export class LoadMoreComponent implements OnInit {
  @Input() moreToLoad: boolean;
  @Output() loadMore = new EventEmitter();

  constructor() {
    // unutilized
  }

  ngOnInit(): void {
    // unutilized
  }
}
