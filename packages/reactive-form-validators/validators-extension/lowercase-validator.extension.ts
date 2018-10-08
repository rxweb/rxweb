import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { MessageConfig } from "../models/config/message-config";
import { lowercaseValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function lowerCaseValidatorExtension(config?: MessageConfig): ValidatorFn {
    var validator = lowercaseValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.lowerCase, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
