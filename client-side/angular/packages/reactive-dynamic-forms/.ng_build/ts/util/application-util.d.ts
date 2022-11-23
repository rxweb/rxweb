import { AbstractControl, FormGroup } from "@angular/forms";
export declare class ApplicationUtil {
    static getRootFormGroup(control: AbstractControl): FormGroup;
    static isObject(value: any): boolean;
}
