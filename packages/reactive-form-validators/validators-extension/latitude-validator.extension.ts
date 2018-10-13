import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { BaseConfig } from "../models/config/base-config";
import { latitudeValidator } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function latitudeValidatorExtension(config?: BaseConfig): ValidatorFn {
    var validator = latitudeValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.latitude, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
