import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MONTHS_RANGE } from '@models/constants';
import { dateISOToStringDDMMYYYY } from '../functions';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit {
  @Input() fromDate: string;
  @Input() toDate: string;

  @Output() fromDateChange = new EventEmitter<string>();
  @Output() toDateChange = new EventEmitter<string>();

  minDateTo: Date | null = null;

  maxDateTo: Date | null = null;

  ngOnInit(): void {
    if (this.fromDate === undefined) {
      return;
    }

    const [yearFromDate, monthFromDate, dayFromDate] = this.fromDate.split('-');

    const tempMaxDate = new Date(
      parseInt(yearFromDate, 10),
      parseInt(monthFromDate, 10) - 1,
      parseInt(dayFromDate, 10)
    );

    const tempMinDate = new Date(
      parseInt(yearFromDate, 10),
      parseInt(monthFromDate, 10) - 1,
      parseInt(dayFromDate, 10)
    );

    tempMinDate.setDate(tempMinDate.getDate() + 1);
    tempMaxDate.setMonth(tempMaxDate.getMonth() + MONTHS_RANGE);

    this.minDateTo = tempMinDate;
    this.maxDateTo = tempMaxDate;
  }

  /**
   * Parses the from date inputs and applies min and max date to the DateTo calendar
   */
  selectDateFrom($event: Date) {
    const tempMaxDate = new Date($event.getTime());

    const tempMinDate = new Date($event.getTime());

    tempMinDate.setDate(tempMinDate.getDate() + 1);
    tempMaxDate.setMonth(tempMaxDate.getMonth() + MONTHS_RANGE);

    if (this.toDate) {
      const [yearToDate, monthToDate, dayToDate] = this.toDate.split('-');
      const toDateObject = new Date(
        parseInt(yearToDate, 10),
        parseInt(monthToDate, 10) - 1,
        parseInt(dayToDate, 10)
      );

      if (
        toDateObject.getTime() > tempMaxDate.getTime() ||
        toDateObject.getTime() < tempMinDate.getTime()
      ) {
        this.toDate = undefined;
        this.toDateChange.emit(this.toDate);
      }
    }

    this.minDateTo = tempMinDate;
    this.maxDateTo = tempMaxDate;

    this.fromDate = dateISOToStringDDMMYYYY($event);
    this.fromDateChange.emit(this.fromDate);
  }

  /**
   * Parses the to date value
   */
  selectDateTo($event: Date) {
    this.toDate = dateISOToStringDDMMYYYY($event);
    this.toDateChange.emit(this.toDate);
  }
}
