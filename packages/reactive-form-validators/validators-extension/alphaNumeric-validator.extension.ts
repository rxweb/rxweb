import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { AlphaConfig } from '../models/config/alpha-config';
import { alphaNumericValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function alphaNumericValidatorExtension(config?: AlphaConfig): ValidatorFn {
    var validator = alphaNumericValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.alphaNumeric, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.alphaNumeric), validator(control);
      return null
    }
    return rxwebValidator;
}
