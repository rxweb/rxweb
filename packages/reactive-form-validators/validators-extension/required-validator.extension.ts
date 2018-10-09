import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { MessageConfig } from "../models/config/message-config";
import { requiredValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function requiredValidatorExtension(config?: MessageConfig): ValidatorFn {
    var validator = requiredValidator(config);
  var rxwebValidator = (control: any, target?: object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.required, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
