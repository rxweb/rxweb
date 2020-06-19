import { AbstractControlOptions, ValidatorFn, AsyncValidatorFn, FormArray, FormControl, FormGroup } from "@angular/forms";
import { ControlState } from "./control-state";
import { ControlConfig } from './control-config'
import { IFormGroup } from './i-form-group';
import { IFormArray } from './i-form-array'
import { IFormControl } from './i-form-control';

export interface IFormBuilder {
    array<Item = any>(controlsConfig: ControlConfig<Item>[], validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): IFormArray<Item>;
    control<T = any>(formState: ControlState<T>, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): IFormControl<T>;

    group(controlsConfig: {
        [key: string]: any;
    }, options?: AbstractControlOptions | {
        [key: string]: any;
    } | null): FormGroup
    group<T extends object = any>(controlsConfig: {
        [key in keyof T]: ControlConfig<T[key]>;
    }, options?: AbstractControlOptions | {
        [key: string]: any;
    } | null): IFormGroup<T>;
}
