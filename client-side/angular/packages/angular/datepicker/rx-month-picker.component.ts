import {Component,
    Input,
    Output, 
    EventEmitter,
} from "@angular/core";

import { monthsShort } from './datepicker.const';

import { RxPickerComponent } from './rx-picker.component';
@Component({
    selector: "rx-month-picker",
    templateUrl: './rx-month-picker.component.html',
})
export class RxMonthPicker {
    monthsShort: string[];
    isLabelYear: boolean = true;

    @Input() month: number;
    @Input() year: number;
    @Output() monthClick: EventEmitter<Date> = new EventEmitter<Date>();

    constructor(public dateComponent: RxPickerComponent) {
        this.monthsShort = monthsShort;
    }

    showDates(month: number): void {
        this.dateComponent.changeViewMode("Date");
        var date = this.utcDate(this.year, month, 28);
        this.monthClick.emit(date);
    }

    nextYear() {
        this.year = this.year + 1;
    }

    previousYear() {
        this.year = this.year - 1;
    }

    showYearInput() {
        this.isLabelYear = !this.isLabelYear;
    }

    utcDate(year: number, month: number, days: number): Date {
        return new Date(Date.UTC.apply(Date, [year, month, days]));
    }
}
