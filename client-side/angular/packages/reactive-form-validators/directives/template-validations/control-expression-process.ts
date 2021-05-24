import { Input, Directive } from "@angular/core";
import {  AbstractControl,FormControl,ValidatorFn } from '@angular/forms';
import { VALIDATOR_CONFIG } from "../../const/app.const";


@Directive()
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
            control[VALIDATOR_CONFIG] = this.controlConfig.validatorConfig;
            this.controlConfig = undefined;
        }
    }
}
