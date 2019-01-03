import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { ComposeConfig } from "../models/config/compose-config";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
import { AnnotationTypes } from "../core/validator.static";

export function composeValidator(config: ComposeConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = ApplicationUtil.getConfigObject(config);
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
