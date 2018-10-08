import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { BaseConfig } from "../models/config/base-config";
import { leapYearValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function leapYearValidatorExtension(config?: BaseConfig): ValidatorFn {
    var validator = leapYearValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.leapYear, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
