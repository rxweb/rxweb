import {
    AsyncValidatorFn ,    ValidatorFn
} from "@angular/forms";
import { AlphaConfig } from '../models/config/alpha-config';
import { alphaNumericValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function alphaNumericValidatorExtension(config?: AlphaConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.alphaNumeric, alphaNumericValidator(config))
}
export function alphaNumericAsyncValidatorExtension(config?: AlphaConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.alphaNumeric, baseAsyncValidator(config, AnnotationTypes.alphaNumeric));
}