import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { ComposeConfig } from "../models/config/compose-config";
import { FormProvider } from '../util/form-provider';
import { AnnotationTypes } from "../core/validator.static";
import {getConfigObject} from "../util/config-provider"
export function composeValidator(config: ComposeConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = getConfigObject(config,control);
    if (FormProvider.ProcessRule(control, config)) {
      if (config.validators) {
        let result = undefined;
        for (let validator of config.validators) {
          result = validator(control);
          if (result)
            break;
        }
        if (result)
          return ObjectMaker.toJson(config.messageKey || AnnotationTypes.compose, config, [control.value]);
      }
    } return ObjectMaker.null();
  }
}
