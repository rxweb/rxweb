import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";
export function asciiValidator(configModel: BaseConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!RegexValidator.isValid(control.value, RegExRule.ascii))
        return ObjectMaker.toJson(AnnotationTypes.ascii, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
