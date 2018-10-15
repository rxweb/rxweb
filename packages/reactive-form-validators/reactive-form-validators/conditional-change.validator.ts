import {
    ValidatorFn,
    AbstractControl,

    FormArray
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";

export function conditionalChangeValidator(conditionalValidationProps: string[]): ValidatorFn {
    var timeOuts: number[] = [];
    var setTimeOut = (control: AbstractControl) => {
        var timeOut = window.setTimeout(t => {
            window.clearTimeout(timeOut);
            control.updateValueAndValidity();
        }, 100)
    }
    return (control: AbstractControl): { [key: string]: any } => {
        const parentFormGroup = control.parent;
        if (parentFormGroup)
        {
            timeOuts = [];
            conditionalValidationProps.forEach(t => {
                if (t.indexOf("[]") != -1) {
                    var splitText = t.split("[]");
                    var formArray = <FormArray>parentFormGroup.get([splitText[0]]);
                    formArray.controls.forEach(formGroup => {
                        var abstractControl = formGroup.get(splitText[1]);
                        if (abstractControl) {
                            setTimeOut(abstractControl);
                        }
                    })
                } else {
                    var control = parentFormGroup.get([t]);
                    if (!control)
                        control = parentFormGroup.root.get([t]);
                    if (control) {
                        setTimeOut(control);
                    }
                }
                
            })
        }
        return ObjectMaker.null();
    }
}
