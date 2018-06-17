import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function rangeValidator(minimumNumber: number,maximumNumber:number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let controlValue = control.value;
        if (controlValue != null && controlValue != undefined) {
            if (String(controlValue).indexOf(".") == -1 && parseInt(controlValue) >= minimumNumber && parseInt(controlValue) <= maximumNumber)
                return null;
            else
                return { 'range': { controlValue } };
        }
        return { 'range': { controlValue } };
    }
}