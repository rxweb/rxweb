import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function lowercaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        if (controlValue) {
            if (controlValue === controlValue.toLowerCase())
                return null;
            else
                return { 'lowercase': { controlValue } };
        }
        return null;
    }
}