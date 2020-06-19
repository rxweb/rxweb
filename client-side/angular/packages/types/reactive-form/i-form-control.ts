import { IAbstractControl } from "./i-abstract-control";
import { ControlState } from "./control-state";

export interface IFormControl<T> extends IAbstractControl<T> {

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


}
