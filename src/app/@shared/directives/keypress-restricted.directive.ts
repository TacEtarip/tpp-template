import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appKeypressRestricted]',
})
export class KeypressRestrictedDirective {
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'CapsLock',
  ];

  @Input() regexExp: string;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const inserted = event.key;

    const regex = new RegExp(this.regexExp);

    if (regex.test(inserted)) {
      return;
    }

    event.preventDefault();
  }
}
