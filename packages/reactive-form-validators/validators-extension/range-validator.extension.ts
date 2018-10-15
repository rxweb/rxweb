import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { RangeConfig } from "../models/config/range-config";
import { rangeValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function rangeValidatorExtension(config?: RangeConfig): ValidatorFn {
    var validator = rangeValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.range, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
