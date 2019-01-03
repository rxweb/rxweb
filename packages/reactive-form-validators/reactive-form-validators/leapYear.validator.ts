import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { ApplicationUtil } from "../util/app-util";
export function leapYearValidator(config: BaseConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = ApplicationUtil.getConfigObject(config);
    if (ValidatorValueChecker.pass(control, config)) {
      var isValid = (control.value % 100 === 0) ? (control.value % 400 === 0) : (control.value % 4 === 0);
      if (!isValid)
        return ObjectMaker.toJson(AnnotationTypes.leapYear, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
