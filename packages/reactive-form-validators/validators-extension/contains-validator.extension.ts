import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { DefaultConfig } from "../models/config/default-config";
import { containsValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function containsValidatorExtension(config?: AlphaConfig): ValidatorFn {
    var validator = containsValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.contains, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
