import { AbstractControl } from "../abstract/abstract-control";
import { ValidatorFn } from "../models/interface/validator-fn";
import { RxFormArray } from "../services/rx-form-array"

export function customChangeValidator(customValidation: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        for (let prop of customValidation.requiredProps) {
            let currentControl!: AbstractControl;
      if (customValidation.nestedProperty) {
        let formControl = control.root.get([customValidation.nestedProperty]);
        if (formControl instanceof RxFormArray) {
          let formGroup = <any>formControl.controls[0];
          currentControl = formGroup.get([prop])
        }
        }
        if (currentControl !== undefined) {
        setTimeout(() =>
          currentControl.updateValueAndValidity(), 300);
      }
    }
    return null;
  }
}
