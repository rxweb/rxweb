import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function minNumberValidator(minimumNumber: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let controlValue = control.value;
        if (controlValue) {
            if (parseInt(controlValue) >= minimumNumber)
                return null;
            else
                return { 'minNumber': { controlValue } };
        }
        return null;
        
    }
}