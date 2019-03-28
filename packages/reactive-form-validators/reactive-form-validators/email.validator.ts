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
import { getConfigObject } from "../util/config-provider"
import { regexValidation } from "../validators-function/regex-validation.function"
export function emailValidator(configModel: EmailConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return regexValidation(configModel, control, RegExRule.basicEmail, AnnotationTypes.email)
  }
}
