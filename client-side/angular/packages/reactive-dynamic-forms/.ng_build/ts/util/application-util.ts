import { AbstractControl,FormGroup } from "@angular/forms"

export class ApplicationUtil
{
    static getRootFormGroup(control: AbstractControl): FormGroup {
        if (control.parent) {
            return this.getRootFormGroup(control.parent);
        }
        return <FormGroup>control;
    }

    static isObject(value: any): boolean {
        return Object.prototype.toString.call(value) === '[object Object]';
    }
}