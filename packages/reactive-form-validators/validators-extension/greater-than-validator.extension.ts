  import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { alphaValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function greaterThanValidatorExtension(config?: RelationalOperatorConfig): ValidatorFn {
    var validator = greaterThanValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.greaterThan, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
