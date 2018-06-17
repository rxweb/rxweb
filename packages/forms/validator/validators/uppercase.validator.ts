import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        if (controlValue) {
            if (controlValue === controlValue.toUpperCase())
                return null;
            else
                return { 'uppercase': { controlValue } };
        }
        return null;
        
    }
}