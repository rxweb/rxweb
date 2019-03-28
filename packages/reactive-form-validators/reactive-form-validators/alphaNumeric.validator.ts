import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegExRule } from "../util/regex-rules";
import { AlphaConfig } from "../models/config/alpha-config";
import { AnnotationTypes } from "../core/validator.static";
import { alphaValidation } from "../validators-function/alpha-validation.function"

export function alphaNumericValidator(configModel: AlphaConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return alphaValidation(configModel,control,[RegExRule.alphaNumeric, RegExRule.alphaNumericWithSpace],AnnotationTypes.alphaNumeric);
  }
}
