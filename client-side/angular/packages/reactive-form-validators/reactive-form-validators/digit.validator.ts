import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegExRule } from "../util/regex-rules";
import { DigitConfig } from "../models/config/digit-config";
import { AnnotationTypes } from "../core/validator.static";
import { regexValidation } from "../validators-function/regex-validation.function"

export function digitValidator(configModel: DigitConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return regexValidation(configModel, control, RegExRule.onlyDigit, AnnotationTypes.digit)
  }
}
