import { FormArray, FormGroup,
    ValidatorFn,
    AbstractControl} from "@angular/forms";
//import {CustomValidation } from '../validator.model';
export function customChangeValidator(customValidation: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        for (let prop of customValidation.requiredProps) {
            let currentControl: AbstractControl;
            if (customValidation.nestedProperty) {
                let formControl = control.root.get([customValidation.nestedProperty]);
                if (formControl instanceof FormArray) {
                    let formGroup = <FormGroup>formControl.controls[0];
                    currentControl = formGroup.get([prop])
                }
            }
            if (currentControl) {
                window.setTimeout(()=>
                currentControl.updateValueAndValidity(),300);   
            }
        }
        return null;
    }
}
