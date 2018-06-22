import {Directive, forwardRef, ElementRef, Renderer, Input, HostListener} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {DecimalPipe} from "@angular/common";

import {ELEMENT_VALUE, BLUR_EVENT, FOCUS_EVENT, TARGET_ELEMENT_VALUE, BLANK_STRING, KEYUP_EVENT } from "../../util/constants/constants";
import {ApplicationConfiguration } from "../../core";
import {RegularExpression } from "../../core/regularexpression";

const RX_DECIMAL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RxDecimalDirective),
    multi: true
}

@Directive({
    selector: '[rxDecimal]',
    providers: [RX_DECIMAL_VALUE_ACCESSOR]
})
export class RxDecimalDirective implements ControlValueAccessor {
    private element: Node;
    private baseValue: any;
    private digits: string

    private onChange: any = (_: any) => { };

    constructor(private elementRef: ElementRef,
        private renderer: Renderer,
        private decimalPipe: DecimalPipe,
        private regularExpression: RegularExpression) {
        this.element = elementRef.nativeElement as Node;
    }

    @Input('rxDecimal') set decimalDigits(value: any) {
        this.digits = value;
    }

    @HostListener(FOCUS_EVENT, [TARGET_ELEMENT_VALUE])
    onFocus(value: string): void {
        if (this.digits) {
            value = value.replace(this.regularExpression.commaRegex(), BLANK_STRING);
            var splitValue = value.split(".");
            value = (splitValue.length > 1 && splitValue[1] && this.regularExpression.isZero(splitValue[1])) ? splitValue[0] : value;
            this.onChange(value);
            this.setValueOnElement(value);
        }
    }

    @HostListener(BLUR_EVENT, [TARGET_ELEMENT_VALUE])
    onBlur(value:any): void {
        if (value)
            this.setDecimalFormatter(value);
        else
          this.onChange(undefined);
    }

    @HostListener(KEYUP_EVENT, [TARGET_ELEMENT_VALUE])
    onKeyup(value: any): void {
      if (value)
        this.onChange(value);
      else
        this.onChange(undefined)
    }

    registerOnChange(fn:any) {
        this.onChange = fn;
        this.onChange(this.baseValue);
        this.setDecimalFormatter(this.baseValue);
    }

    registerOnTouched() { }

    writeValue(value: any): void {
    if (value != null && value != undefined) {
      let isCallDecimalFormatter = (this.baseValue)
            this.baseValue = value;
      this.setDecimalFormatter(this.baseValue);
    }
        else {
            this.baseValue = undefined;
            this.setValueOnElement("");
    }

    }

    private setDecimalFormatter(value: string): void {
        if (this.digits && (/^[-|+]?[0-9]+$/i.test(value) || /^[-|+]?[0-9]\d*(\.\d+)?$/i.test(value))) {
            value = this.decimalPipe.transform(value, this.digits);
            this.setValueOnElement(value);
      } else {
        this.onChange(undefined);
        this.setValueOnElement("");
        }
    }

    private setValueOnElement(value: any) {
        this.renderer.setElementProperty(this.element, ELEMENT_VALUE, value);
    }
}
