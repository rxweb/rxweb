import {
  ValidatorFn, AsyncValidatorFn
} from "@angular/forms";
import { AlphaConfig } from "../models/config/alpha-config";
import { alphaValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension} from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";
export function alphaValidatorExtension(config?: AlphaConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.alpha, alphaValidator(config))
}

export function alphaAsyncValidatorExtension(config?: AlphaConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.alpha, baseAsyncValidator(config, AnnotationTypes.alpha));
}
