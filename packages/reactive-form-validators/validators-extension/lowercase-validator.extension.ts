import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { MessageConfig } from "../models/config/message-config";
import { lowercaseValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function lowerCaseValidatorExtension(config?: MessageConfig): ValidatorFn {
    var validator = lowercaseValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.lowerCase, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.lowerCase),validator(control);
      return null
    }
    return rxwebValidator;
}
