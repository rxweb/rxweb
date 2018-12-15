import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { UniqueConfig} from "../models/config/unique-config";
import { uniqueValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function uniqueValidatorExtension(config?: UniqueConfig): ValidatorFn {
    var validator = uniqueValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.unique, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.unique),validator(control);
      return null
    }
    return rxwebValidator;
}
