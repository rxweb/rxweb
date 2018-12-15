import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { PasswordConfig } from "../models/config/password-config";
import { passwordValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function passwordcValidatorExtension(config: PasswordConfig): ValidatorFn {
    var validator = passwordValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.password, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.password),validator(control);
      return null
    }
    return rxwebValidator;
}
