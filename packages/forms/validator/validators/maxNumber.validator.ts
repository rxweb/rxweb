import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";

export function maxNumberValidator(maxNumber: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const controlValue = control.value;
      
        if (controlValue) {
            if (parseFloat(controlValue) <= maxNumber)
                return null;
            else
                return { 'maxNumber': { maxNumber } };
        }
        return null;
    }
}
