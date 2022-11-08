import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTable]',
})
export class TableDirective {
  @Input() key: string;
  @Input() test: any;
  constructor(public templateRef: TemplateRef<unknown>) {}
}
