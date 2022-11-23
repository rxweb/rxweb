import {
    AsyncValidatorFn,ValidatorFn
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { minLengthValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function minLengthValidatorExtension(config?: NumberConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.minLength, minLengthValidator(config))
}
export function minLengthAsyncValidatorExtension(config?: NumberConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.minLength, baseAsyncValidator(config, AnnotationTypes.minLength));
}