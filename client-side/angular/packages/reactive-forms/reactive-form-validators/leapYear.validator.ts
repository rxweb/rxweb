import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function leapYearValidator(configModel: BaseConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      var isValid = (control.value % 100 === 0) ? (control.value % 400 === 0) : (control.value % 4 === 0);
      if (!isValid)
        return ObjectMaker.toJson(AnnotationTypes.leapYear, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
