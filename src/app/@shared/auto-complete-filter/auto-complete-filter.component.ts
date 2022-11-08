import { Subject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { validatePatternObject } from '../functions';
import { LENGTH_TO_ALLOW_AUTO_COMPLETE } from '@models/constants';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete-filter',
  templateUrl: './auto-complete-filter.component.html',
  styleUrls: ['./auto-complete-filter.component.scss'],
})
export class AutoCompleteFilterComponent implements OnInit, OnDestroy {
  autoCompleteControl: FormControl;

  @Input() regex: string;

  @Input() objectField: string;

  @Input() placeHolder: string;

  @Input() value: Record<any, any> & { disabled: boolean };

  @Output() valueChange = new EventEmitter<
    Record<any, any> & { disabled: boolean }
  >();

  @Input() options: any[] = [];

  @Output() search = new EventEmitter<string>();

  @Input() errorMessage: string;

  @Input() objectIdentifierKey: string;

  autoCompleteSubscription: Subscription;

  ngOnDestroy(): void {
    this.autoCompleteSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    const regexToValidate = new RegExp(this.regex);

    this.autoCompleteControl = new FormControl(
      this.value,
      validatePatternObject(regexToValidate, this.objectField)
    );

    this.autoCompleteSubscription = this.autoCompleteControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        if (typeof value === 'string') {
          this.handleStringValue(value);
        } else {
          this.handleObjectValue(value);
        }
      });
  }

  handleObjectValue(value: Record<any, any>) {
    this.valueChange.emit({
      ...value,
      disabled: this.autoCompleteControl.invalid,
    });
  }

  handleStringValue(value: string) {
    const trimmedValue = value.trim();

    if (value) {
      this.valueChange.emit({
        [this.objectIdentifierKey]: -1,
        [this.objectField]: trimmedValue,
        disabled: this.autoCompleteControl.invalid,
      });
    } else {
      this.valueChange.emit(undefined);
      this.options = [];
      return;
    }

    if (trimmedValue.length < LENGTH_TO_ALLOW_AUTO_COMPLETE) {
      this.options = [];
      return;
    }

    this.search.emit(trimmedValue);
  }
}
