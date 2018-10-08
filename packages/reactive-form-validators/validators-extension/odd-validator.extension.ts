import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { BaseConfig } from "../models/config/base-config";
import { oddValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function oddValidatorExtension(config?: BaseConfig): ValidatorFn {
    var validator = oddValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.odd, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
