import {
  AsyncValidatorFn,ValidatorFn
} from "@angular/forms";
import { ContainsConfig } from "../models/config/contains-config";
import { containsValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function containsValidatorExtension(config?: ContainsConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.contains, containsValidator(config))
}
export function containsAsyncValidatorExtension(config?: ContainsConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.contains, baseAsyncValidator(config, AnnotationTypes.contains));
}
