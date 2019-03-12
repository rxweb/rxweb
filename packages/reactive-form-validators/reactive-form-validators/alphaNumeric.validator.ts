import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { AlphaConfig } from "../models/config/alpha-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";
export function alphaNumericValidator(config: AlphaConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = getConfigObject(config,control);
    if (ValidatorValueChecker.pass(control, config)) {
      var isValid = (!config || !config.allowWhiteSpace) ?
        RegexValidator.isValid(control.value, RegExRule.alphaNumeric) :
        RegexValidator.isValid(control.value, RegExRule.alphaNumericWithSpace);
      if (!isValid)
        return ObjectMaker.toJson(AnnotationTypes.alphaNumeric, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
