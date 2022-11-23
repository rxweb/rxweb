import {Component,
    Input,
    Output, HostListener,
    EventEmitter,
} from "@angular/core";

import { DateDisabled } from './datepicker.models';

@Component({
    selector: "rx-picker",
    templateUrl: './rx-picker.component.html',
})
export class RxPickerComponent {
    month: number;
    year: number;

    @Input() value: Date;
    @Input() weekStart: number = 2;
    @Input() viewMode: string = "Date";
    @Input() disableWeekDays: number[];
    @Input() highlightWeekDays: number[];
    @Input() datesDisabled: DateDisabled[];
    @Output() selectDate: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() hoverEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    changeViewMode(mode: string, currentMonth?: number, currentYear?: number) {
        if (currentMonth) {
            this.month = currentMonth;
            this.year = currentYear;
        }
        this.viewMode = mode;
    }

    @HostListener('mouseover')
    onMouseover() {
        this.hoverEvent.emit(false);
    }

    @HostListener('mouseleave')
    onMouseleave() {
        this.hoverEvent.emit(true);
    }
}