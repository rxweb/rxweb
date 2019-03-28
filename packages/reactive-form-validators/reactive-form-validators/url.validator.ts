import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegExRule } from "../util/regex-rules";
import { DefaultConfig } from "../models/config/default-config";
import { AnnotationTypes } from "../core/validator.static";
import { regexValidation } from "../validators-function/regex-validation.function"

export function urlValidator(configModel: DefaultConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return regexValidation(configModel, control, RegExRule.url, AnnotationTypes.url)
  }
}
