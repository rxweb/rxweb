import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { MessageConfig } from "../models/config/message-config";
import { uppercaseValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function upperCaseValidatorExtension(config?: MessageConfig): ValidatorFn {
    var validator = uppercaseValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.upperCase, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.upperCase),validator(control);
      return null
    }
    return rxwebValidator;
}
