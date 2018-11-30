import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { DefaultConfig } from "../models/config/default-config";
import { jsonValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function jsonValidatorExtension(config?: DefaultConfig): ValidatorFn {
    var validator = jsonValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.json, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.json),validator(control);
      return null
    }
    return rxwebValidator;
}
