import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { maxNumberValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function maxNumberValidatorExtension(config?: NumberConfig): ValidatorFn {
    var validator = maxNumberValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.maxNumber, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.maxNumber),validator(control);
      return null
    }
    return rxwebValidator;
}
