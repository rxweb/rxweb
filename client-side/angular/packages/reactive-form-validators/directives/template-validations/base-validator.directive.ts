import { Input } from "@angular/core"
import {  ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import {
    INPUT, SELECT, CHECKBOX, TEXTAREA, 
    RADIO, FILE, CHANGE
} from "../../const";

import { ControlExpressionProcess } from './control-expression-process'
import { MaskProvider } from '../../domain/element-processor/mask.provider';

export class BaseValidator extends ControlExpressionProcess {
    @Input() formControl: FormControl | AbstractControl;

    protected validators: ValidatorFn[]  = [];
    protected element: any;
    protected eventName: string;
    protected maskProvider: MaskProvider;

    validation(control: AbstractControl): { [key: string]: any } {
        let result = null;
        for (let validator of this.validators) {
            result = validator(control);
            if (result)
                break;
        }
        if (!result && this.maskProvider)
           result = this.maskProvider.validate();
        return result;
    }


    protected setEventName() {
        var eventName: string = '';
        switch (this.element.tagName) {
            case INPUT:
            case TEXTAREA:
                eventName = (this.element.type == CHECKBOX || this.element.type == RADIO || this.element.type == FILE) ? CHANGE : INPUT;
                break;
            case SELECT:
                eventName = CHANGE;
                break;
        }
        this.eventName = eventName.toLowerCase();
    }



}
