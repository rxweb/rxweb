import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { ContainsConfig } from "../models/config/contains-config";
import { containsValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function containsValidatorExtension(config?: ContainsConfig): ValidatorFn {
    var validator = containsValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.contains, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.contains),validator(control);
      return null
    }
    return rxwebValidator;
}
