import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { EmailConfig } from "../models/config/email-config";
import { emailValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function emailValidatorExtension(config?: AlphaConfig): ValidatorFn {
    var validator = emailValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.email, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
