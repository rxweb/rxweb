import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function portValidator(configModel: BaseConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      let isValid = RegexValidator.isValid(control.value, RegExRule.onlyDigit) && (control.value >= 0 && control.value <= 65535);
      if (!isValid)
        return ObjectMaker.toJson(AnnotationTypes.port, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
