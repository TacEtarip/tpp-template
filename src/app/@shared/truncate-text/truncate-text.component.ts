import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-truncate-text',
  templateUrl: './truncate-text.component.html',
  styleUrls: ['./truncate-text.component.scss'],
})
export class TruncateTextComponent implements OnInit {
  @Input() maxLength: number;
  @Input() text: string;
  showFullComment = false;

  textToShow: string;

  ngOnInit(): void {
    this.textToShow = this.truncateText();
  }

  /**
   * Truncates the text if it surpasses the max length
   */
  truncateText() {
    if (this.maxLength < this.text.length) {
      return this.text.substring(0, this.maxLength);
    }
    return this.text;
  }
}
