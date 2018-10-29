import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { DifferentConfig } from "../models/config/compare-config";
import { differentValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function differentValidatorExtension(config?: DifferentConfig): ValidatorFn {
    var validator = differentValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.different, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.different),validator(control);
      return null
    }
    return rxwebValidator;
}
