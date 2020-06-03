import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegExRule } from "../util/regex-rules";
import { BaseConfig } from "../models/config/base-config";
import { AnnotationTypes } from "../core/validator.static";
import { regexValidation } from "../validators-function/regex-validation.function"
export function asciiValidator(configModel: BaseConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
      return regexValidation(configModel, control, RegExRule.ascii, AnnotationTypes.ascii)
  }
}
