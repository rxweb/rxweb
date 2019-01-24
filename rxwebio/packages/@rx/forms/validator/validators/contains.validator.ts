import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function containsValidator(value: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        if (controlValue) {
            if (controlValue.indexOf(value) >= 0)
                return null;
            else 
                return { 'contains':  value  };
        }
        return null;
    }
}