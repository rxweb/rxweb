import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { RegExRule } from "../util/regex-rules";
import { AlphaConfig } from "../models/config/alpha-config";
import { AnnotationTypes } from "../core/validator.static";
import { alphaValidation } from "../validators-function/alpha-validation.function"

export function alphaValidator(configModel: AlphaConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return alphaValidation(configModel,control,[RegExRule.alpha, RegExRule.alphaWithSpace],AnnotationTypes.alpha);
  }
}
