import {
    AsyncValidatorFn,ValidatorFn
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { minNumberValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function minNumberValidatorExtension(config?: NumberConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.minNumber, minNumberValidator(config))
}
export function minNumberAsyncValidatorExtension(config?: NumberConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.minNumber, baseAsyncValidator(config, AnnotationTypes.minNumber));
}