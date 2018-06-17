import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        if (controlValue) {
            if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(controlValue))
                return null;
            else
                return { 'email': { controlValue } };
        }
        return null;
        
    }
}