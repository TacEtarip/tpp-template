import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICheckboxFiler } from '@models/interfaces/ICheckboxFiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-filter',
  templateUrl: './check-filter.component.html',
  styleUrls: ['./check-filter.component.scss'],
})
export class CheckFilterComponent implements OnInit, OnDestroy {
  @Input() filters: ICheckboxFiler[];
  @Input() unique = false;
  @Output() filtersChange = new EventEmitter<ICheckboxFiler[]>();

  filtersWithControl: ({ control: FormControl } & ICheckboxFiler)[] = [];
  subscriptions = new Subscription();

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  ngOnInit(): void {
    for (const filter of this.filters) {
      const serviceFilterWithControl = {
        ...filter,
        control: new FormControl(filter.active),
      };

      this.filtersWithControl.push(serviceFilterWithControl);

      this.subscriptions.add(
        serviceFilterWithControl.control.valueChanges.subscribe(
          (res: boolean) => {
            if (res === true && this.unique === true) {
              this.filters.forEach((f) => {
                if (f.value !== serviceFilterWithControl.value) {
                  f.active = false;
                }
              });
              this.filtersWithControl.forEach((f) => {
                if (f.value !== serviceFilterWithControl.value) {
                  f.control.setValue(false);
                }
              });
            }
            filter.active = res;
            this.filtersChange.emit(this.filters);
          }
        )
      );
    }
  }
}
