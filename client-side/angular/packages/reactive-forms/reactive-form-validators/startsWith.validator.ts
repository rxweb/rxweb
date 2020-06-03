import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { ObjectMaker } from "../util/object-maker";
import { DefaultConfig } from "../models/config/default-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function startsWithValidator(configModel: DefaultConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      var startString = String(control.value).substr(0, config.value.length);
      if (startString != config.value)
        return ObjectMaker.toJson(AnnotationTypes.startsWith, config, [control.value, config.value]);
    }
    return ObjectMaker.null();
  }
}
