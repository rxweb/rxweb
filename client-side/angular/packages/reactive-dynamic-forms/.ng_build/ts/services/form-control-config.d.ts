import { ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { Hooks } from "../models/interface/action-config";
import { BaseFormControlConfig } from './base-form-control-config';
import { RxFormControl } from "@rxweb/reactive-form-validators";
export declare abstract class FormControlConfig extends BaseFormControlConfig {
    controlsConfig: {
        [key: string]: FormControlConfig;
    };
    private _formControl;
    constructor(fieldConfig: {
        [key: string]: any;
    }, controlsConfig: {
        [key: string]: FormControlConfig;
    });
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
    hooks: Hooks;
    formControl: RxFormControl;
    readonly errorMessage: string;
    readonly prependText: any;
}
export declare class ControlConfig extends FormControlConfig {
    constructor(fieldConfig: {
        [key: string]: any;
    }, controlsConfig: {
        [key: string]: FormControlConfig;
    });
}
