import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'
import { NumberConfig } from "../models/config/number-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
import { NUMBER_CONFIG } from "../const/config-names.const";
export function minLengthValidator(configModel: NumberConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let config = getConfigObject(configModel,control,NUMBER_CONFIG);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!(String(control.value).length >= config.value))
        return ObjectMaker.toJson(AnnotationTypes.minLength, config, [control.value, config.value])
    }
    return ObjectMaker.null();
  }
}
