import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { RegExRule } from "../util/regex-rules";
import { EmailConfig } from "../models/config/email-config";
import { AnnotationTypes } from "../core/validator.static";
import { regexValidation } from "../validators-function/regex-validation.function"
export function emailValidator(configModel: EmailConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return regexValidation(configModel, control, RegExRule.basicEmail, AnnotationTypes.email)
  }
}
