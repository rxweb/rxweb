import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { ArrayConfig } from "../models/config/array-config";
import { allOfValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';

export function allOfValidatorExtension(config?: ArrayConfig): ValidatorFn {
    var validator = allOfValidator(config) ;
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.allOf, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.allOf), validator(control);
      return null
    }
    return rxwebValidator;
}
