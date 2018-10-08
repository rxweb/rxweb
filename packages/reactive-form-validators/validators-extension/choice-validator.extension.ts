import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { ChoiceConfig } from "../models/config/choice-config";
import { choiceValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function choiceValidatorExtension(config?: ChoiceConfig): ValidatorFn {
    var validator = choiceValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.choice, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
