import {
    AsyncValidatorFn,ValidatorFn
} from "@angular/forms";
import { BaseDateConfig } from "../models/config/base-date-config";
import { dateValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function dateValidatorExtension(config?: BaseDateConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.date, dateValidator(config))
}
export function dateAsyncValidatorExtension(config?: BaseDateConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.date, baseAsyncValidator(config, AnnotationTypes.date));
}