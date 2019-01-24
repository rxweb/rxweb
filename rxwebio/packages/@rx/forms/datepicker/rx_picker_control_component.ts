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

import { DateDisabled } from './datepicker.models';

@Component({
    selector: "rx-picker",
    templateUrl: './rx_picker_control_component.html',
   // styleUrls: ['./datepicker.css']
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