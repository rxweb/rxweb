import {Component,
    AfterContentInit,
    Input,
    Output, HostListener,
    EventEmitter,
    ViewChild,
    OnInit, ComponentRef, ComponentFactoryResolver, EmbeddedViewRef,
    ElementRef, ViewContainerRef, forwardRef, ViewChildren, QueryList, OnDestroy

} from "@angular/core";

import {Subscription} from "rxjs/Rx";
import {NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl} from "@angular/forms"

import {ApplicationConfiguration } from '../../core';
import { monthsShort } from './datepicker.const';


import { RxPickerComponent} from './rx_picker_control_component';
@Component({
    selector: "rx-month-picker",
    templateUrl: './rx_month_picker_control_component.html',
    //styleUrls: ['./datepicker.css']
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
