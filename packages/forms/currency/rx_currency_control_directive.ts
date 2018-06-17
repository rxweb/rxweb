import {Directive, forwardRef,ElementRef,Renderer,Input,HostListener} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";

import {ELEMENT_VALUE, BLANK_STRING, BLUR_EVENT, KEYUP_EVENT, FOCUS_EVENT, TARGET_ELEMENT_VALUE } from "../../util/constants/constants";
import {ApplicationConfiguration } from "../../core";
import {RegularExpression } from "../../core/regularexpression";

const USD_CURRENCY_CODE = 'USD';

const APPLICATION_CONFIGURATION_CURRENCY_CODE = "internationalization.currencyCode";

const RX_CURRENCY_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RxCurrencyDirective),
    multi: true
}


@Directive({
    selector: '[rxCurrency]',
    providers: [RX_CURRENCY_VALUE_ACCESSOR]
})
export class RxCurrencyDirective implements ControlValueAccessor {
    private element: Node;
    private currencyValue: string;
    private isDisplayCurrencySymbol: boolean;
    private currencyCode: string;
    private defaultFraction: string = "1.0";

    private onChange: any = (_: any) => { };

    constructor(private elementRef: ElementRef,
        private renderer: Renderer,
        private currencyPipe: CurrencyPipe,
        private regularExpression: RegularExpression)
    {
        this.element = elementRef.nativeElement as Node;
    }


    @Input('rxCurrency') set rxCurrency(value: any) {
        this.isDisplayCurrencySymbol = value === "true" || value === true || value === 1;
    }

    @Input() currencyDigits: string;

    @HostListener(FOCUS_EVENT, [TARGET_ELEMENT_VALUE])
    onFocus(value: string) {
        if (value) {
            value = value.replace(this.regularExpression.commaRegex(), BLANK_STRING)
        }
        var splitValue = value.split(".");
        value = (splitValue.length > 1 && splitValue[1] && this.regularExpression.isZero(splitValue[1])) ? splitValue[0] : value;
        this.onChange(value)
        this.setValueOnElement(value);
    }

    @HostListener(BLUR_EVENT, [TARGET_ELEMENT_VALUE])
    onBlur(value:any) {
        if (value)
            this.setCurrencyFormat(value);
    }

    @HostListener(KEYUP_EVENT, [TARGET_ELEMENT_VALUE])
    onKeyUp(value: string) {
        this.onChange(value)
    }

    setCurrencyCode() {
        if (!this.currencyCode) {
            this.currencyCode = ApplicationConfiguration.get(APPLICATION_CONFIGURATION_CURRENCY_CODE);
        }
    }

    registerOnChange(fn: (value: any) => any): void {
        this.onChange = fn;
        this.onChange(this.currencyValue);
    }

    registerOnTouched() { }

    writeValue(value:any) {
        if (value) {
            this.currencyValue = value;
            this.setCurrencyFormat(value);
        }
    }

    private setCurrencyFormat(value: string) {
        this.setCurrencyCode();
        if (this.isDisplayCurrencySymbol)
            value = this.currencyPipe.transform(value, this.currencyCode, this.isDisplayCurrencySymbol, this.currencyDigits || this.defaultFraction);
        else
            value = this.currencyPipe.transform(value, USD_CURRENCY_CODE, this.isDisplayCurrencySymbol, this.currencyDigits || this.defaultFraction).replace(USD_CURRENCY_CODE, BLANK_STRING);
        this.setValueOnElement(value);
    }

    private setValueOnElement(value: string) {
        this.renderer.setElementProperty(this.element, ELEMENT_VALUE, value);
    }
}