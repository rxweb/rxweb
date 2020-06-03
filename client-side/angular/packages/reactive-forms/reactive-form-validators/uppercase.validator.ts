import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'
import { MessageConfig } from "../models/config/message-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function uppercaseValidator(configModel?: MessageConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null=> {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!(control.value === control.value.toUpperCase()))
        return ObjectMaker.toJson(AnnotationTypes.upperCase, config, [control.value])
    }
    return ObjectMaker.null();
  }
}
