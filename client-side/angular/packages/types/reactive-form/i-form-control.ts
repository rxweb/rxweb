import { IAbstractControl } from "./i-abstract-control";
import { ControlState } from "./control-state";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export interface IFormControl<T> extends FormControl {
    readonly errorMessages?: string[]; // only for RxWeb Packages

    readonly errorMessage?: string; // only for RxWeb Packages

    readonly value: T | null;

    readonly valueChanges: Observable<T | null>;

    readonly statusChanges: Observable<"VALID" | "INVALID" | "PENDING" | "DISABLED" | null>;

    get(path: string): IAbstractControl<T> | null;

    setValue(value: null | T, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;

    patchValue(value: null | T | Partial<T>, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;

    reset(formState?: ControlState<T>, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;

    getError(errorCode: string, path?: string): any;
    patchValue(value: null | T, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;

    reset(formState?: ControlState<T>, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;

    setValue(value: null | T, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;

    registerOnChange(fn: Function): void;

    registerOnDisabledChange(fn: (isDisabled: boolean) => void): void;

}
