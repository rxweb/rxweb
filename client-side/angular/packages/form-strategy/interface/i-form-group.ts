import { FormGroup } from "@angular/forms";
import { IAbstractControl } from './i-abstract-control'
export interface AppFormGroup<T> extends FormGroup {

    controlsError: { [key: string]: any };

    submitted: boolean;
}

export interface IFormGroup<T> extends AppFormGroup<T> {
    controls: { [key in keyof T]: IAbstractControl };
}



