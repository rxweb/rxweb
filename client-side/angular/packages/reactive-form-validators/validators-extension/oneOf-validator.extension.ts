import {
    AsyncValidatorFn,    ValidatorFn
} from "@angular/forms";
import { ArrayConfig } from "../models/config/array-config";
import { oneOfValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function oneOfValidatorExtension(config?: ArrayConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.oneOf, oneOfValidator(config))
}
export function oneOfAsyncValidatorExtension(config?: ArrayConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.oneOf, baseAsyncValidator(config, AnnotationTypes.oneOf));
}