import {
  ValidatorFn,
  AbstractControl,

  FormArray
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { ApplicationUtil } from "../util/app-util"

export function conditionalChangeValidator(conditionalValidationProps: string[]): ValidatorFn {
  var timeOuts: number[] = [];
  var oldValue: string = undefined;
  var setTimeOut = (control: AbstractControl) => {
    var timeOut = window.setTimeout(t => {
      window.clearTimeout(timeOut);
      control.updateValueAndValidity();
    }, 100)
  }
  return (control: AbstractControl): { [key: string]: any } => {
      const parentFormGroup = ApplicationUtil.getRootFormGroup(control);
    let value = control.value;
    if (parentFormGroup && oldValue != value) {
      oldValue = value;
      timeOuts = [];
      conditionalValidationProps.forEach(t => {
        if (t.indexOf("[]") != -1) {
          var splitText = t.split("[]");
          var formArray = <FormArray>parentFormGroup.get([splitText[0]]);
          if (formArray)
            formArray.controls.forEach(formGroup => {
              var abstractControl = formGroup.get(splitText[1]);
              if (abstractControl) {
                setTimeOut(abstractControl);
              }
            })
        } else {
          var control = null;
          t.split('.').forEach((name, index) => { control = (index == 0) ? parentFormGroup.controls[name] : control.controls[name]; })
          if (control) {
            setTimeOut(control);
          }
        }
      })
    }
    return ObjectMaker.null();
  }
}
