import { FormGroup } from "@angular/forms"
import { IAbstractControl } from "./i-abstract-control"
export interface IFormGroup<T> extends FormGroup {
    controls: { [key in keyof T]: IAbstractControl };

    isDirty: () => boolean;

    resetForm: () => void;

    getErrorSummary: (onlyMessage: boolean) => { [key: string]: any };

    toFormData: () => FormData;

    patchModelValue: (value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }) => void;

    valueChangedSync: () => void;

    refreshDisable: () => void;

    bindErrorMessages: () => void;

    value: T;

    modelInstanceValue: T;

    modelInstance: T;

    controlsError: { [key: string]: any };
}