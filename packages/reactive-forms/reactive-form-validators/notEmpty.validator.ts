import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'
import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { BaseConfig } from "../models/config/base-config";
import { FormProvider } from '../util/form-provider';
import {getConfigObject} from "../util/config-provider";
export function notEmptyValidator(configModel: BaseConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null=> {
    let config = getConfigObject(configModel,control);
    if (FormProvider.ProcessRule(control, config)) {
      if (!RegexValidator.isNotBlank(control.value,true)) {
        return ObjectMaker.toJson(AnnotationTypes.notEmpty, config, [])
      }
    }
    return ObjectMaker.null();
  }
}
