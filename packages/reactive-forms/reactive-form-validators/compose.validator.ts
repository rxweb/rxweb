import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { ObjectMaker } from "../util/object-maker";
import { ComposeConfig } from "../models/config/compose-config";
import { FormProvider } from '../util/form-provider';
import { AnnotationTypes } from "../core/validator.static";
import {getConfigObject} from "../util/config-provider"
export function composeValidator(configModel: ComposeConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let config = getConfigObject(configModel,control);
    if (FormProvider.ProcessRule(control, config)) {
      if (config.validators) {
        let result = undefined;
        for (let validator of config.validators) {
          result = validator(control);
          if (result)
            break;
          }
          if (result)
              return (config.messageKey || config.message) ? ObjectMaker.toJson(config.messageKey || AnnotationTypes.compose, config, [control.value]) : result;
      }
    } return ObjectMaker.null();
  }
}
