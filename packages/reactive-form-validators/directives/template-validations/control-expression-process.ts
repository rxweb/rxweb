import { Input } from "@angular/core";
import {  AbstractControl,FormControl,ValidatorFn } from '@angular/forms';


export abstract class ControlExpressionProcess {

    protected validator: ValidatorFn;
    protected conditionalValidator: ValidatorFn;
    protected controlConfig: { [key: string]: any } = {};

    @Input() name: string;

    @Input() formControlName: string;

    isProcessed: boolean = false;
    protected controls: { [key: string]: FormControl };

    setModelConfig(control: AbstractControl) {
        this.isProcessed = true;
        if (this.controlConfig && this.controlConfig.validatorConfig) {
            control["validatorConfig"] = this.controlConfig.validatorConfig;
            this.controlConfig = undefined;
        }
    }
}
