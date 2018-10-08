import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { DateConfig } from "../models/config/date-config";
import { maxDateValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function maxDateValidatorExtension(config?: DateConfig): ValidatorFn {
    var validator = maxDateValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.maxDate, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
