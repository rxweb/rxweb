import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { PasswordConfig } from "../models/config/password-config";
import { passwordValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function passwordcValidatorExtension(config?: PasswordConfig): ValidatorFn {
    var validator = passwordValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.password, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
