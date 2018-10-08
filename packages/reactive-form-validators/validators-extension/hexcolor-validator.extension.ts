import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { HexColorConfig } from "../models/config/hex-color-config";
import { alphaValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function hexColorValidatorExtension(config?: HexColorConfig): ValidatorFn {
    var validator = hexColorValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.hexColor, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
