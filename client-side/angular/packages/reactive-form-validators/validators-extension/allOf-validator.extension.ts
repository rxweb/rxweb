import {
  ValidatorFn, AsyncValidatorFn
} from "@angular/forms";
import { ArrayConfig } from "../models/config/array-config";
import { allOfValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function allOfValidatorExtension(config?: ArrayConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.allOf, allOfValidator(config))
}
export function allOfAsyncValidatorExtension(config?: ArrayConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.allOf, baseAsyncValidator(config, AnnotationTypes.allOf));
}