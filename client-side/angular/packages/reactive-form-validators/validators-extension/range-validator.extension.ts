import {
    AsyncValidatorFn,    ValidatorFn
} from "@angular/forms";
import { RangeConfig } from "../models/config/range-config";
import { rangeValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function rangeValidatorExtension(config?: RangeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.range, rangeValidator(config))
}
export function rangeAsyncValidatorExtension(config?: RangeConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.range, baseAsyncValidator(config, AnnotationTypes.range));
}