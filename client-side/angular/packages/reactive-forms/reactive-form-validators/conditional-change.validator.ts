import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'
import { RxFormArray } from "../services/rx-form-array"
import { ObjectMaker } from "../util/object-maker";
import { ApplicationUtil } from "../util/app-util"


export function conditionalChangeValidator(conditionalValidationProps: string[]): ValidatorFn {
  var timeOuts: number[] = [];
  var oldValue: any = undefined;
  var setTimeOut = (control: AbstractControl) => {
    var timeOut = setTimeout(t => {
      clearTimeout(timeOut);
      control.updateValueAndValidity();
    }, 100)
  }
    return (control: AbstractControl): { [key: string]: any } | null => {
    let value = control.value;
    if (control.parent && oldValue != value) {
        const rootFormGroup = ApplicationUtil.getRootFormGroup(control);
        const parentFormGroup = control.parent;

      oldValue = value;
      timeOuts = [];
      conditionalValidationProps.forEach(t => {
        let a = control;
        if (t.indexOf("[]") != -1) {
            var splitText = t.split("[]");
          var formArray = <RxFormArray>rootFormGroup.get([splitText[0]]);
          if (formArray)
            formArray.controls.forEach(formGroup => {
              var abstractControl = formGroup.get(splitText[1]);
              if (abstractControl) {
                setTimeOut(abstractControl);
              }
            })
        } else {
            
            let splitText = t.split('.');
            if(splitText.length > 1){
              var control :any= null;
              t.split('.').forEach((name, index) => { control = (index == 0) ? rootFormGroup.controls[name] : control.controls[name]; })
            }
          else {
            control = parentFormGroup.controls[t];
          }
          
          if (control) {
            setTimeOut(control);
          }
        }
      })
    }
    return ObjectMaker.null();
  }
}
