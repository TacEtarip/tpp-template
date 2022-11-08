import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IInputFilter } from '@models/interfaces/IInputFiler';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['./input-filter.component.scss'],
})
export class InputFilterComponent implements OnInit, OnDestroy, OnChanges {
  @Input() inputFilter: IInputFilter;

  @Output() inputFilterChange = new EventEmitter<IInputFilter>();

  @Input() placeholder = '';

  @Input() regex: RegExp;

  @Input() type = 'text';

  @Input() errorMessage = '';

  inputControl: FormControl;

  inputSubscription: Subscription;

  ngOnDestroy(): void {
    this.inputSubscription?.unsubscribe();
  }

  ngOnChanges(changes: any): void {
    if (
      changes.inputFilter &&
      this.inputFilter.value !== changes.inputFilter.value
    ) {
      this.inputControl?.setValue(this.inputFilter.value);
    }
  }

  ngOnInit(): void {
    this.inputControl = new FormControl(
      this.inputFilter.value,
      Validators.pattern(this.regex)
    );
    this.inputSubscription = this.inputControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((newValue) => {
        this.inputFilterChange.emit({
          value: newValue,
          disabled: this.inputControl.invalid,
        });
      });
  }
}
