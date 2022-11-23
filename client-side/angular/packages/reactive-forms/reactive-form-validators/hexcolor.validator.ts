import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'
import { RegExRule } from "../util/regex-rules";
import { AnnotationTypes } from "../core/validator.static";
import { HexColorConfig } from "../models/config/hex-color-config";
import { regexValidation } from "../validators-function/regex-validation.function"

export function hexColorValidator(configModel: HexColorConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return regexValidation(configModel, control, RegExRule.strictHexColor, AnnotationTypes.hexColor)
  }
}
