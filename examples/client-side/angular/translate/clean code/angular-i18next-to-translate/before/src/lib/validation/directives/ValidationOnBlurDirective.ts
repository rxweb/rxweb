import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[validate-onblur]',
    host: {
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)',
        '(keyup)': 'onKeyup($event)',
        '(change)': 'onChange($event)'
    }
})
// cache and remove validation on focus, and restore on blur
export class ValidationOnBlurDirective {
    private validators: any;
    private asyncValidators: any;
    private wasChanged: any;
    constructor(public formControl: NgControl) {
    }
    onFocus($event) {
        this.wasChanged = false;
        this.validators = this.formControl.control.validator;
        this.asyncValidators = this.formControl.control.asyncValidator;
        this.formControl.control.clearAsyncValidators();
        this.formControl.control.clearValidators();
    }
    onKeyup($event) {
        this.wasChanged = true; // keyboard change
    }
    onChange($event) {
        this.wasChanged = true; // ng-value change
    }
    onBlur($event) {
        this.formControl.control.setAsyncValidators(this.asyncValidators);
        this.formControl.control.setValidators(this.validators);
        if (this.wasChanged)
            this.formControl.control.updateValueAndValidity();
    }
}
