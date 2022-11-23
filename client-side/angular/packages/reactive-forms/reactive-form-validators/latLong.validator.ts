import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function latLongValidator(configModel: BaseConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      let splitText = control.value.split(',')
      if (!(splitText.length > 1 && RegexValidator.isValid(splitText[0], RegExRule.lat) && RegexValidator.isValid(splitText[1], RegExRule.long)))
        return ObjectMaker.toJson(AnnotationTypes.latLong, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}

