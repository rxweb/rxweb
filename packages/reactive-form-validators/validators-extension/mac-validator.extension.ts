import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { AlphaConfig } from "../models/config/alpha-config";
import { macValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function macValidatorExtension(config?: AlphaConfig): ValidatorFn {
    var validator = macValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.mac, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
