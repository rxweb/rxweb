import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { NumericConfig } from "../models/config/numeric-config";
import { numericValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function numericValidatorExtension(config?: NumericConfig): ValidatorFn {
    var validator = numericValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.numeric, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
