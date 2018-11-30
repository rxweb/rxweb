import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { TimeConfig } from "../models/config/time-config";
import { timeValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function timeValidatorExtension(config?: TimeConfig): ValidatorFn {
    var validator = timeValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.time, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.time),validator(control);
      return null
    }
    return rxwebValidator;
}
