import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { lessThanEqualToValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function lessThanEqualToValidatorExtension(config?: RelationalOperatorConfig): ValidatorFn {
    var validator = lessThanEqualToValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.lessThanEqualTo, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
