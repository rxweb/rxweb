import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { minLengthValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function minLengthValidatorExtension(config?: NumberConfig): ValidatorFn {
    var validator = minLengthValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.minLength, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
