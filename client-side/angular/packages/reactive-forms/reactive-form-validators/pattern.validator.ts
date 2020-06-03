import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'
import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { PatternConfig } from "../models/config/pattern-config";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
import { PATTERN_CONFIG } from "../const/config-names.const";
export function patternValidator(configModel: PatternConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let config = getConfigObject(configModel,control,PATTERN_CONFIG);
    if (ValidatorValueChecker.pass(control, config)) {
      for (var pattern in config.expression)
        if (!(RegexValidator.isValid(control.value, config.expression[pattern])))
          return ObjectMaker.toJson(pattern, config, [control.value])
    }
    return ObjectMaker.null();
  }
}
