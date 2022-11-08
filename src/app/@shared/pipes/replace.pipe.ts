import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(value: any, regexValue: any, replaceValue: any): any {
    const regex = new RegExp(regexValue, 'g');
    return value.replace(regex, replaceValue);
  }
}
