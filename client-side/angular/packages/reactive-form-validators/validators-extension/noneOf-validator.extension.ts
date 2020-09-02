import {
    AsyncValidatorFn,    ValidatorFn
} from "@angular/forms";
import { ArrayConfig } from "../models/config/array-config";
import { noneOfValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function noneOfValidatorExtension(config?: ArrayConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.noneOf, noneOfValidator(config))
}
export function noneOfAsyncValidatorExtension(config?: ArrayConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.noneOf, baseAsyncValidator(config, AnnotationTypes.noneOf));
}