import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { CreditCardConfig } from "../models/config/credit-card-config";
import { creditCardValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function creditCardValidatorExtension(config?: AlphaConfig): ValidatorFn {
    var validator = alphaNumericValidator(config,null);
    var rxwebValidator = (control:AbstractControl,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.creditCard, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}
