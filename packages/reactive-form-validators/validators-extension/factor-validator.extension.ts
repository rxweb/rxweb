import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { FactorConfig } from "../models/config/factor-config";
import { factorValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function factorValidatorExtension(config?: FactorConfig): ValidatorFn {
    var validator = factorValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.factor, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.factor),validator(control);
      return null
    }
    return rxwebValidator;
}
