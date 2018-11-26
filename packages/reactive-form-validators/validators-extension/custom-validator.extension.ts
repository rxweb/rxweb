import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { CustomConfig } from "../models/config/custom-config";
import { customValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function customValidatorExtension(config?: CustomConfig): ValidatorFn {
    var validator = customValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.custom, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.custom),validator(control);
      return null
    }
    return rxwebValidator;
}
