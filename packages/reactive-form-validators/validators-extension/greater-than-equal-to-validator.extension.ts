import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { greaterThanEqualToValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function greaterThanEqualToValidatorExtension(config?: RelationalOperatorConfig): ValidatorFn {
    var validator = greaterThanEqualToValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.greaterThanEqualTo, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
