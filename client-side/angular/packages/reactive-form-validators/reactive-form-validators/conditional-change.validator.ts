import {
    ValidatorFn,
    AbstractControl,

    FormArray
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { ApplicationUtil } from "../util/app-util"
import { FormProvider } from "../util/form-provider"
const DISABLED_EXPRESSION: string = "disableExpression";
export function conditionalChangeValidator(conditionalValidationProps: string[]): ValidatorFn {
    var timeOuts: number[] = [];
    var oldValue: string = undefined;
    var setTimeOut = (control: AbstractControl, config: any) => {
        if (control[DISABLED_EXPRESSION])
            runDisabledExpression(control, config);
        var timeOut = setTimeout(t => {
            clearTimeout(timeOut);
            control.updateValueAndValidity({ emitEvent:false })
        }, 100)
    }
    return (control: AbstractControl): { [key: string]: any } => {
        let value = control.value;
        if (control.parent && oldValue != value) {
            const rootFormGroup = ApplicationUtil.getRootFormGroup(control);
            const parentFormGroup = control.parent;
            oldValue = value;
            timeOuts = [];
            let controlName = ApplicationUtil.getFormControlName(control);
            let disabledConfig = { [controlName]: value };
            conditionalValidationProps.forEach(t => {
                let a = control;
                if (t.indexOf("[]") != -1) {
                    var splitText = t.split("[]");
                    var formArray = <FormArray>rootFormGroup.get([splitText[0]]);
                    if (formArray)
                        formArray.controls.forEach(formGroup => {
                            var abstractControl = formGroup.get(splitText[1]);
                            if (abstractControl) {
                                setTimeOut(abstractControl, disabledConfig);
                            }
                        })
                } else {

                    let splitText = t.split('.');
                    if (splitText.length > 1) {
                        var control = null;
                        t.split('.').forEach((name, index) => { control = (index == 0) ? rootFormGroup.controls[name] : control.controls[name]; })
                    }
                    else {
                        control = parentFormGroup.controls[t];
                    }

                    if (control) {

                        setTimeOut(control, disabledConfig);
                    }
                }
            })
        }
        return ObjectMaker.null();
    }
}
function runDisabledExpression(control, config) {
    let isDisabled = FormProvider.ProcessRule(control, { conditionalExpression: control[DISABLED_EXPRESSION], disableConfig: config });
    if (isDisabled && !control.disabled)
        control.disable();
    else if (control.disabled)
        control.enable();
}
