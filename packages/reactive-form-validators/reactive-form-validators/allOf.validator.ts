import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { ArrayConfig } from "../models/config/array-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";
export function allOfValidator(configModel: ArrayConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.passArrayValue(control, config)) {
      var testResult = false;
      for (let value of config.matchValues) {
        testResult = control.value.some((y) => y == value);
        if (!testResult)
          break;
      }
      if (!testResult)
        return ObjectMaker.toJson(AnnotationTypes.allOf, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
