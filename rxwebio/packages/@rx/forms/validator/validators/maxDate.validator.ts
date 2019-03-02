import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function maxDateValidator(date:string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = new Date(control.value);
        if (controlValue) {
            let maxDate = new Date(date);
            if (controlValue <= maxDate)
                return null;
            else
                return { 'maxDate': { date } };
        }
        return null;
        
    }
}