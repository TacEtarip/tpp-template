import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent {
  @Input() control: FormControl;
  @Input() placeHolder: string;
  @Input() results: Record<string, any>[];
  @Input() errorMessage: string;
  @Input() objectField: string;
  @Input() regexKeyValidator: string;

  @Output()
  completeMethod = new EventEmitter<any>();

  @Output() resultSelected = new EventEmitter<any>();
}
