import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { RegExRule } from "../util/regex-rules";
import { RegexValidator } from "../util/regex-validator";
import { EmailConfig } from "../models/config/email-config";
import { ObjectMaker } from "../util/index";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider"
export function emailValidator(config: EmailConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = getConfigObject(config,control);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!RegexValidator.isValid(control.value, RegExRule.basicEmail))
        return ObjectMaker.toJson(AnnotationTypes.email, config, [control.value])
    }
    return ObjectMaker.null();
  }
}
