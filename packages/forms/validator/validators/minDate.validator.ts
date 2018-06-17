import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function minDateValidator(date: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = new Date(control.value);
        if (controlValue) {
            let minDate= new Date(date);
            if (controlValue >= minDate)
                return null;
            else
                return { 'minDate': { controlValue } };
        }
        return null;
    }
}