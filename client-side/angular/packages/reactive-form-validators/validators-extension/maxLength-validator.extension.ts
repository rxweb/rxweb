import {
    ValidatorFn, AsyncValidatorFn
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { maxLengthValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function maxLengthValidatorExtension(config?: NumberConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.maxLength, maxLengthValidator(config))
}
export function maxLengthAsyncValidatorExtension(config?: NumberConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.maxLength, baseAsyncValidator(config, AnnotationTypes.maxLength));
}