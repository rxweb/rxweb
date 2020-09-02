import {
    AsyncValidatorFn,   ValidatorFn
} from "@angular/forms";
import { MaxTimeConfig } from "../models/config/time-config";
import { maxTimeValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function maxTimeValidatorExtension(config?: MaxTimeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.maxTime, maxTimeValidator(config))
}
export function maxTimeAsyncValidatorExtension(config?: MaxTimeConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.maxTime, baseAsyncValidator(config, AnnotationTypes.maxTime));
}