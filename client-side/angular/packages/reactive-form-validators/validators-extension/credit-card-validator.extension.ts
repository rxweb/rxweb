import {
    AsyncValidatorFn,   ValidatorFn
} from "@angular/forms";
import { CreditCardConfig } from "../models/config/credit-card-config";
import { creditCardValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function creditCardValidatorExtension(config?: CreditCardConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.creditCard, creditCardValidator(config))
}
export function creditCardAsyncValidatorExtension(config?: CreditCardConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.creditCard, baseAsyncValidator(config, AnnotationTypes.creditCard));
}
