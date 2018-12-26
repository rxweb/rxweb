import {
    ValidatorFn
} from "@angular/forms";
import { CreditCardConfig } from "../models/config/credit-card-config";
import { creditCardValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function creditCardValidatorExtension(config?: CreditCardConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.creditCard, creditCardValidator(config))
}
