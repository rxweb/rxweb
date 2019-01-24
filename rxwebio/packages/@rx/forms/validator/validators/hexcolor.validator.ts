import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function hexColorValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        if (controlValue) {
            if (/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(controlValue))
                return null;
            else
                return { 'hexColor': { controlValue } };
        }
        return null;
        
    }
}