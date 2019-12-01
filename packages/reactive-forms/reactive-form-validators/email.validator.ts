import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { RegExRule } from "../util/regex-rules";
import { EmailConfig } from "../models/config/email-config";
import { AnnotationTypes } from "../core/validator.static";
import { regexValidation } from "../validators-function/regex-validation.function"
export function emailValidator(configModel: EmailConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return regexValidation(configModel, control, RegExRule.basicEmail, AnnotationTypes.email)
  }
}
