import { IAbstractControl } from "./i-abstract-control"
import { AbstractControl } from "../../abstract/abstract-control";

export interface AppFormGroup<T> extends AbstractControl {
    path: number;

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

    submitted: boolean;

    onChange: any;

    get(path): IAbstractControl;
}

export interface IFormGroup<T> extends AppFormGroup<T> {
    controls: { [key in keyof T]: IAbstractControl };

    props: { [key in keyof T]: any }
}