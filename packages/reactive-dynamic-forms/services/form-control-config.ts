import { ValidatorFn, AsyncValidatorFn } from "@angular/forms"
import {  Hooks} from "../models/interface/action-config"

import { BaseFormControlConfig } from './base-form-control-config'
import { RxFormControl } from "@rxweb/reactive-form-validators";


export abstract class FormControlConfig extends BaseFormControlConfig {
    private _formControl: RxFormControl;

    constructor(fieldConfig: { [key: string]: any }, public controlsConfig: { [key: string]: FormControlConfig }) {
        super(controlsConfig);
        this.config = fieldConfig;
        this.value = fieldConfig.value;
        super.checkFilterFunction();
        this.props = Object.create({});
    }

    
    inputs: any;
    events: any;

    value: any;
    disabled: boolean;
    label: string;
    placeholder: string;
    hide: boolean;
    description: string;
    focus: boolean;
    readonly: boolean;
    class: string[];

    isPlainTextMode: boolean;
    
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;

    hooks: Hooks


    set formControl(value: RxFormControl) {
        this._formControl = value;
        setTimeout(() => this.overrideErrorsProp(this._formControl), 10);
    }

    get formControl() {
        return this._formControl;
    }

    get errorMessage(): string {
        return this.formControl.errorMessage;
    }

    get prependText() {
        return this.config.ui ? this.config.ui.prependText : '';
    }
}

export class ControlConfig extends FormControlConfig {
    constructor(fieldConfig: { [key: string]: any }, controlsConfig: { [key: string]: FormControlConfig }) {
        super(fieldConfig, controlsConfig);
    }
}