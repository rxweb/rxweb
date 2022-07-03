import {
  Component, Inject,
  AfterContentInit,
  Input,
  Output, HostListener,
  EventEmitter,
  ViewChild,
  OnInit, ComponentRef, ComponentFactoryResolver, EmbeddedViewRef,
  ElementRef, ViewContainerRef, forwardRef, ViewChildren, QueryList, OnDestroy

} from "@angular/core";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { MultiLingualData } from "@rxweb/localization"


import { Subscription, Observable } from "rxjs";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from "@angular/forms"
import { RxPickerComponent } from './rx-picker.component'
import { DateDisabled } from './datepicker.models';
import { ComponentView, OverlayViewHost, OverlayPositionHost, OffSetModel } from '@rxweb/angular/api';
import { RxDatePickerComponent } from './rx-date-picker.component';
import { RxMonthPicker } from './rx-month-picker.component';


@Component({
    selector: "rx-date",
    template: `<div class="input-group"><input [tabindex]="controlTabIndex" type="text" #inputDate [disabled]="pickerDisabled" [placeholder]="placeholder" [class]="pickerClass" (click)="onFocus($event)" (focus)="onFocus($event)" 
                        (blur)="onBlur($event,$event.target)" (keyup)="onKeyup($event.target.value)" [(ngModel)]="selectedDate" />
    <div *ngIf="showAddon" class="input-group-append" (click)="prependClick($event)">
                              <span class="input-group-text"><i class="fa fa-calendar" ></i></span>
                            </div></div>
`,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RxDateComponent), multi: true },
    ]
})
export class RxDateComponent implements OnDestroy, OnInit {
  @ViewChildren('inputDate') inputDate: QueryList<ElementRef>;
  element: Element;
  isInValid: boolean = false;
  seperator: string;
  format: string;
  month: number;
  year: number;
  selectedDate: string;
  isValidationSuccess: boolean = true;
  private propagateChange: any = () => { };
  value: Date;
  timeOutId: number;
  dateFormatPattern: RegExp = /^(\d*)(\.|-|\/)(\d*)(\.|-|\/)(\d*)$/
  validateFn: any = () => { };
  overlayElement: HTMLElement;
  isMouseLeave: boolean = true;
  hoverSubscriber: Subscription;
  selectDateSubscription: Subscription;
  conditionalSubscription: Subscription;
  overlayViewHost: OverlayViewHost;
  overlayPositionHost: OverlayPositionHost;
  isPrependClick: boolean = false;
  componentView: ComponentView<RxPickerComponent>;
  @Output() onSelected: EventEmitter<Date> = new EventEmitter<Date>();
    @Input() placeholder: string;
  constructor(public elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef,
    public componentFactoryResolver: ComponentFactoryResolver,
  ) {
      this.format = MultiLingualData.get("internationalization.date.format");
      this.seperator = MultiLingualData.get("internationalization.date.seperator");
      this.placeholder = this.placeholder || MultiLingualData.get("control.rx-date.placeholder");
    this.overlayViewHost = new OverlayViewHost(document);
    this.overlayPositionHost = new OverlayPositionHost();
    this.element = elementRef.nativeElement as Element;
  }


  @Input() weekStart: number = 0;
  @Input() viewMode: string = "Date";
  @Input() disableWeekDays: number[];
  @Input() highlightWeekDays: number[];
  @Input() datesDisabled: DateDisabled[];
  @Input() pickerClass: string;
  @Input() conditional: Observable<boolean>;
  @Input() pickerDisabled: boolean;
  @Input() showAddon: boolean;
  @Input() controlTabIndex: number;


  private registerOnChange(fn) {
    this.propagateChange = fn;
    if (this.value) {
      this.propagateChange(this.value);
    }

  }

  ngOnInit(): void {
    this.element.classList.add("custom-control-style");
    this.checkValid(true);
    if (this.conditional)
      this.conditionalSubscription = this.conditional.subscribe(t => this.checkValid(t));
  }

  checkValid(isValid: boolean) {
    if (isValid)
      this.timeOutId = window.setTimeout(() => {
        for (var i = 0; i < this.element.classList.length; i++) {
          this.isInValid = this.element.classList[i] == "ng-invalid";
        }
        window.clearTimeout(this.timeOutId);
        this.timeOutId = undefined;
      }, 500);
    else
      this.isInValid = isValid;
  }



  private registerOnTouched() { }


  private writeValue(value: any) {
    if (value) {
      if (typeof value === 'string') {
        value = new Date(<string>value);
      }
      this.value = value;
      this.selectedDate = this.makeDateString(value);
    } else {
      this.selectedDate = value;
    }
    this.onSelected.emit(this.value)
  }

  utcDate(year: number, month: number, days: number): Date {
    return new Date(year, month, days);
  }

  makeDateString(value: Date): string {
    let dateString: string = '';
    for (let character of this.format) {
      switch (character) {
        case 'm':
          dateString += dateString.length == 0 ? (value.getMonth() + 1).toString() : this.seperator + (value.getMonth() + 1)
          break;
        case 'd':
          dateString += dateString.length == 0 ? (value.getDate()).toString() : this.seperator + (value.getDate())
          break;
        case 'y':
          dateString += dateString.length == 0 ? (value.getFullYear()).toString() : this.seperator + (value.getFullYear())
          break;
      }
    }
    return dateString;
  }

  isValidDate(value: string): Date {
    let date: Date;
    let dateNumber: number;
    if (this.dateFormatPattern.test(value)) {
      var splitValue = value.split(this.seperator);
      let dateString: string = '';
      if (splitValue.length == 3) {
        for (let character of 'mdy') {
          var index = this.format.indexOf(character);
          dateString += dateString.length == 0 ? splitValue[index].toString() : "/" + splitValue[index].toString();
          if (character == "d")
            dateNumber = parseInt(splitValue[index]);
          if (character === 'y') {
            if (parseInt(splitValue[index]) > 1699 && parseInt(splitValue[index]) < 3001) {
              date = new Date(dateString);
            }
          }
        }
      }
    }
    if (date && dateNumber == date.getDate())
      return date;
    return undefined;
  }
  validate(formControl: FormControl) {
    return (this.isValidationSuccess) ? null : { dateError: 'Invalid Date' };
  }

  changeViewMode(mode: string, currentMonth?: number, currentYear?: number) {
    if (currentMonth) {
      this.month = currentMonth;
      this.year = currentYear;
    }
    this.viewMode = mode;
  }

  onFocus(event: Event): void {
    if (!this.pickerDisabled)
      if (!this.componentView) {
        this.createPicker();
        this.isPrependClick = true;
      }
  }

  prependClick(event: any): void {
    if (!this.pickerDisabled) {
      if (!this.componentView && !this.isPrependClick) {
        this.inputDate.first.nativeElement.focus();
        this.onFocus(event);
      } else {
        this.isPrependClick = false;
      }
    }
  }
  onKeyup(value: string): void {
    if (value) {
      let date = this.isValidDate(value);
      this.isValidationSuccess = date && date.toString() !== "Invalid Date"
      if (this.isValidationSuccess)
        this.isInValid = false, this.propagateChange(this.utcDate(date.getFullYear(), date.getMonth(), date.getDate()));
      else
        this.isInValid = true, this.propagateChange(undefined);
    } else
      this.propagateChange(undefined), window.setTimeout(() => this.checkValid(true), 200);
  }

  onBlur(event: Event, element: HTMLInputElement): void {
    if (this.isMouseLeave)
      this.removePicker();
    let date = this.isValidDate(element.value);
    this.isValidationSuccess = date && date.toString() !== "Invalid Date"
    if (this.isValidationSuccess)
      this.setValue(date,true);
    if (!this.isValidationSuccess) {
      element.value = '';
    }
  }

  private createPicker() {
    this.setOverlay();

    if (this.timeOutId)
      window.clearTimeout(this.timeOutId);
    this.timeOutId = window.setTimeout(() => {
      this.showPicker();
    }, 2)

  }

  private setOverlay() {
    var pickerElement = this.createPickerComponent();
    this.overlayViewHost.createElement(["datepicker", "datepicker-dropdown", "dropdown-menu", "datepicker-orient-left", "datepicker-orient-bottom"]);
    this.overlayViewHost.appendChild(pickerElement);
  }

  private removePicker() {
    if (this.componentView) {
      this.componentView.destroy();
      this.overlayViewHost.destroy();
      this.componentView = undefined;
      this.isPrependClick = false;
    }
  }

  private showPicker() {
    let offSetModel = new OffSetModel("bottom",
      this.overlayPositionHost.getClientRectangle(this.elementRef.nativeElement),
      this.overlayPositionHost.getOffset(this.elementRef.nativeElement),
      this.overlayPositionHost.getOffset(this.overlayViewHost.element), false);
    var calculatedOffset = this.overlayPositionHost.getCalculatedOffset(offSetModel);
    this.overlayViewHost.applyPlacement(calculatedOffset);
    this.overlayViewHost.setStyle({ 'display': 'block', 'z-index': 9999 });
  }

  private createPickerComponent(): HTMLElement {
    this.componentView = new ComponentView<RxPickerComponent>(RxPickerComponent, this.viewContainerRef, this.componentFactoryResolver);
    this.componentView.create({
      'value': this.value,
      'weekStart': this.weekStart,
      'viewMode': this.viewMode,
      'disableWeekDays': this.disableWeekDays,
      'highlightWeekDays': this.highlightWeekDays,
      'datesDisabled': this.datesDisabled
    });
    let componentRef = this.componentView.getComponentRef();
    this.selectDateSubscription = componentRef.instance.selectDate.subscribe(t => {
      this.setValue(t);
    });
    this.hoverSubscriber = componentRef.instance.hoverEvent.subscribe(t => this.onHover(t));
    return this.componentView.rootNode();
  }

  setValue(value: Date, isBlur: boolean = false) {
    this.isInValid = false;
    this.propagateChange(value);
    this.writeValue(value);
    if (this.inputDate && !isBlur)
      this.inputDate.first.nativeElement.focus();
  }

  onHover(value: boolean): void {
    this.isMouseLeave = value;
    if (this.isMouseLeave)
      this.removePicker();
  }

  ngOnDestroy(): void {
    this.removePicker();
    if (this.selectDateSubscription) {
      this.selectDateSubscription.unsubscribe();
      this.hoverSubscriber.unsubscribe();
    }
    if (this.conditionalSubscription)
      this.conditionalSubscription.unsubscribe();
  }
}





@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [RxDateComponent, RxDatePickerComponent, RxMonthPicker, RxPickerComponent],
    declarations: [RxDateComponent, RxDatePickerComponent, RxMonthPicker, RxPickerComponent]
})
export class RxDatePickerModule { }
