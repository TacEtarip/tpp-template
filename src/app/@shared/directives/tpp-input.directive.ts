import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Directive({
  selector: '[tppInput]',
})
export class TppInputDirective implements OnInit, OnDestroy {
  @HostBinding('class.tpp-input')
  inputClass = true;

  @Input()
  @HostBinding('class.error-input')
  inValid = false;

  @Input()
  @HostBinding('class.area-input')
  textArea = false;

  @Input()
  datePicker = false;

  touched = false;

  subscriptions = new Subscription();

  @HostListener('click', ['$event'])
  onDateClick(e: any) {
    if (this.datePicker) {
      e.target.showPicker();
    }
  }

  @HostListener('blur', ['$event']) onBlur() {
    if (this.control && !this.touched) {
      this.touched = true;
      this.inValid = this.control.invalid || false;
    }
  }

  constructor(@Optional() private control: NgControl) {}

  ngOnInit(): void {
    if (this.control) {
      this.subscriptions.add(
        this.control.valueChanges
          ?.pipe(distinctUntilChanged())
          .subscribe(() => {
            this.inValid = this.control.invalid || false;
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
