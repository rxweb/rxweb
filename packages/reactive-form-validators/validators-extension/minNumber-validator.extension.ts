import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { minNumberValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function minNumberValidatorExtension(config?: NumberConfig): ValidatorFn {
    var validator = minNumberValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.minNumber, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
