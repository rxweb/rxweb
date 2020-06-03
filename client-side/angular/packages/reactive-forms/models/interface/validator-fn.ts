import { AbstractControl } from '../../abstract/abstract-control'
export interface ValidatorFn {
    (control: AbstractControl): {[key:string]:any} | null;
}

export interface AsyncValidatorFn {
    (control: AbstractControl): Promise<{ [key: string]: any } | null>;
}