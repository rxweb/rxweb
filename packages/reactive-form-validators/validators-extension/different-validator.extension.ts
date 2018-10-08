import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { DifferentConfig } from "../models/config/compare-config";
import { differentValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function differentValidatorExtension(config?: AlphaConfig): ValidatorFn {
    var validator = differentValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.different, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
