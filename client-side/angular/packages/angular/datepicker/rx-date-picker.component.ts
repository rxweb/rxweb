import {Component,
    AfterContentInit,
    Input,
    Output, 
    EventEmitter,
    OnInit, 
} from "@angular/core";

import {DateDisabled, DateCollection, Week, Day} from './datepicker.models';
import { daysMin, months, monthsShort } from './datepicker.const';
import { RxPickerComponent } from './rx-picker.component';


@Component({
    selector: "rx-date-picker",
    templateUrl: './rx-date-picker.component.html',
    exportAs: 'date-picker',
})
export class RxDatePickerComponent implements AfterContentInit, OnInit {
    dayShortNames: Array<string>;
    monthsShort: string[];
    dateCollection: DateCollection;
    currentMonth: number;
    @Input() value: Date;
    @Input() weekStart: number = 0;
    @Input() disableWeekDays: number[];
    @Input() highlightWeekDays: number[];
    @Input() datesDisabled: DateDisabled[];
    @Output() viewModeClick: EventEmitter<string> = new EventEmitter<string>();

    constructor(public dateComponent: RxPickerComponent) {
        this.monthsShort = monthsShort;
    }



    ngOnInit(): void {
        this.dayShortNames = new Array<string>();
        var dayCount = this.weekStart;
        daysMin.forEach(t => {
            this.dayShortNames.push(daysMin[dayCount]);
            if (dayCount == 6)
                dayCount = 0;
            else
                dayCount++;
        })
    }

    ngAfterContentInit(): void {
        this.value = (this.value) ? this.value : new Date();
        this.currentMonth = this.value.getMonth();
        this.make(this.value);
    }

    make(date: Date): void {

        var dc = this.dateComponent;
        this.dateCollection = new DateCollection();
        var year = date.getFullYear(),
            month = date.getMonth();
        this.dateCollection.nextMonth = this.utcDate(year, month + 1, 28);
        this.dateCollection.previousMonth = this.utcDate(year, month - 1, 28);
        var prevMonth = this.utcDate(year, month - 1, 28),
            day = this.daysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
        prevMonth.setDate(day);
        prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7) % 7);
        var nextMonth = new Date(prevMonth.toString());
        nextMonth.setDate(nextMonth.getDate() + 42);
        var nextMonthValueOf = nextMonth.valueOf();
        this.dateCollection.year = year;
        this.dateCollection.monthName = months[month];
        this.dateCollection.month = month;

        var dayCount = this.weekStart;
        this.dateCollection.weeks = new Array<Week>();
        var days: Day[];
        while (prevMonth.valueOf() < nextMonthValueOf) {
            if (dayCount === this.weekStart) {
                var week = new Week();
                week.days = new Array<Day>();
            }
            var isWeekDayDisable = (this.disableWeekDays && this.disableWeekDays.length && this.disableWeekDays.filter(t => t == dayCount).length !== 0);
            var isHighlightWeekDay = (this.highlightWeekDays && this.highlightWeekDays.length && this.highlightWeekDays.filter(t => t == dayCount).length !== 0);
            let dateDisabled: DateDisabled = (
                this.datesDisabled &&
                this.datesDisabled.length &&
                this.datesDisabled.filter(t =>
                    t.date.getMonth() == prevMonth.getMonth() &&
                    t.date.getFullYear() == prevMonth.getFullYear() &&
                    t.date.getDate() == prevMonth.getDate())[0])
            week.days.push(new Day(
                this.utcDate(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate()),
                (this.value.getDate() == prevMonth.getDate() && this.value.getMonth() == prevMonth.getMonth()),
                prevMonth.getMonth() !== month,
                prevMonth.getFullYear(),
                prevMonth.getMonth(),
                prevMonth.getDay(),
                prevMonth.getDate(),
                isWeekDayDisable,
                isHighlightWeekDay,
                dateDisabled));
            prevMonth.setDate(prevMonth.getDate() + 1);
            if (dayCount == 6) {
                dayCount = 0;
                this.dateCollection.weeks.push(week);
            } else {
                dayCount++
            }
        }
    }

    changeViewMode() {
        this.dateComponent.changeViewMode("Month", this.dateCollection.month, this.dateCollection.year);
    }

    nextMonth(date: Date) {
        this.make(date);
    }

    previousMonth(date: Date) {
        this.make(date);
    }

    show(date: Date) {
        this.make(date);
    }

    select(day: Day) {
        if (!day.isDisabled && !day.dateDisabled) {
            this.deSelect();
            day.selected = true;
            this.dateComponent.selectDate.emit(day.date)
        }
    }

    private deSelect() {
        for (let week of this.dateCollection.weeks) {
            var selectedDay = week.days.filter(t => t.selected);
            if (selectedDay.length > 0)
                selectedDay[0].selected = false;
        } 
    }

    isLeapYear(year: number): boolean {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    }

    daysInMonth(year, month): number {
        return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    utcDate(year: number, month: number, days: number): Date {
        return new Date(year, month, days);
    }
}
