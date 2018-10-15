import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { ArrayConfig } from "../models/config/array-config";
import { oneOfValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function oneOfValidatorExtension(config?: ArrayConfig): ValidatorFn {
    var validator = oneOfValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.oneOf, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
