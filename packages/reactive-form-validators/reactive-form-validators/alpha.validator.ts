import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegExRule } from "../util/regex-rules";
import { AlphaConfig } from "../models/config/alpha-config";
import { AnnotationTypes } from "../core/validator.static";
import { alphaValidation } from "../validators-function/alpha-validation.function"

export function alphaValidator(configModel: AlphaConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return alphaValidation(
            {
                configModel: configModel,
                control: control,
                regExps: [RegExRule.alpha, RegExRule.alphaWithSpace],
                key: AnnotationTypes.alpha
            });
  }
}
