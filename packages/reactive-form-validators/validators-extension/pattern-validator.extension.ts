import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { PatternConfig } from "../models/config/pattern-config";
import { patternValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function patternValidatorExtension(config?: PatternConfig): ValidatorFn {
    var validator = patternValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.pattern, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
