import {
  ValidatorFn, AsyncValidatorFn
} from "@angular/forms";
import { IBANConfig } from "../models/config/iban-config";
import { ibanValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension} from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";
export function ibanValidatorExtension(config?: IBANConfig): ValidatorFn {
    return baseValidator(config, AnnotationTypes.iban, ibanValidator(config))
}

export function ibanAsyncValidatorExtension(config?: IBANConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.iban, baseAsyncValidator(config, AnnotationTypes.iban));
}
