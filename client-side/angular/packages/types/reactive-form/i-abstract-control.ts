import { Observable } from "rxjs";
import { AbstractControl} from "@angular/forms"
import { ControlState } from './control-state';

export interface IAbstractControl<T, Entity = any> extends AbstractControl {

    readonly errorMessages?: string[]; // only for RxWeb Packages

    readonly errorMessage?: string; // only for RxWeb Packages

    readonly value: T | null;

    readonly valueChanges: Observable<T | null>;

    readonly statusChanges: Observable<"VALID" | "INVALID" | "PENDING" | "DISABLED">;

    get<T, K extends keyof Entity>(path: Array<Extract<K, string> | number> | Extract<K, string>): IAbstractControl<Entity[K]> | null;

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

    getError(errorCode: string, path?: Array<Extract<keyof Entity, string> | number> | Extract<keyof Entity, string>): any;
}
