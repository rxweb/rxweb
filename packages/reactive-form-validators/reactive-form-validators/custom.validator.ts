import {FormArray, FormGroup,
    ValidatorFn,
    AbstractControl} from "@angular/forms";
//import {CustomValidation } from '../validator.model';
export function customValidator(customValidation:any,propName:string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let currentControl: AbstractControl;
        let currentFormGroup: FormGroup;
        if (customValidation.nestedProperty) {
            let formControl = control.root.get([customValidation.nestedProperty]);
            if (formControl instanceof FormArray) {
                currentFormGroup = <FormGroup>formControl.controls[0];
                currentControl = currentFormGroup.get([propName])
            }
        }
        let isSuccess = customValidation.validationFunction(currentFormGroup, propName);
        if (isSuccess === null ) {
            return null;
        }
        else
            return { 'custom': isSuccess };
    }
}
