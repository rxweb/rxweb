import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { BaseConfig } from "../models/config/base-config";
import { primeNumberValidator } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function primeNumberValidatorExtension(config?: BaseConfig): ValidatorFn {
    var validator = primeNumberValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.primeNumber, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
