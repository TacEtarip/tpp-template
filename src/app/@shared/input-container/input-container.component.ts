import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tpp-form',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
})
export class InputContainerComponent {
  @Input() label: string;
  @Input() for: string;
  @Input() errorInputMessage: string;
  @Input() disableErrorMessage = true;
}
