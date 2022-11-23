import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { TimeConfig } from "../models/config/time-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function timeValidator(configModel: TimeConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      let isValid = config.allowSeconds ? RegexValidator.isValid(control.value, RegExRule.timeWithSeconds) : RegexValidator.isValid(control.value, RegExRule.time);
      if (!isValid)
        return ObjectMaker.toJson(AnnotationTypes.time, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
