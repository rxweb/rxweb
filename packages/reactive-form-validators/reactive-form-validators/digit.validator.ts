import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { DigitConfig } from "../models/config/digit-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function digitValidator(config: DigitConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = getConfigObject(config,control);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!RegexValidator.isValid(control.value, RegExRule.onlyDigit))
        return ObjectMaker.toJson(AnnotationTypes.digit, config, [control.value])
    }
    return ObjectMaker.null();
  }
}
