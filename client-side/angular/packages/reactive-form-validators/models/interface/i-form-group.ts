import { FormGroup } from "@angular/forms"
import { IAbstractControl } from "./i-abstract-control"

export interface AppFormGroup<T> extends FormGroup {

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

    setBackEndErrors: (errors: { [key: string]: any })=> void;

    clearBackEndErrors: (errors?: { [key: string]: any }) => void;

    valueChangedSync: () => void;

    refreshDisable: () => void;

    bindErrorMessages: () => void;

    value: T;

    modelInstanceValue: T;

    modelInstance: T;

    controlsError: { [key: string]: any };

    submitted: boolean;
}

export interface IFormGroup<T> extends AppFormGroup<T> {
    controls: { [key in keyof T]: IAbstractControl };
}