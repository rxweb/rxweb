import { IAbstractControl } from "./i-abstract-control"
import { ControlState } from './control-state'
import { ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from "@angular/forms";
import { IFormGroup } from './i-form-group';

export declare type ControlConfig<T> = IFormGroup<T> | IAbstractControl<T> | ControlState<T> | [ControlState<T>, (ValidatorFn | ValidatorFn[] | AbstractControlOptions)?, (AsyncValidatorFn | AsyncValidatorFn[])?];
