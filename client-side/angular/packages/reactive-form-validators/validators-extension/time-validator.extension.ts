import {
    AsyncValidatorFn,  ValidatorFn
} from "@angular/forms";
import { TimeConfig } from "../models/config/time-config";
import { timeValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function timeValidatorExtension(config?: TimeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.time, timeValidator(config))
}
export function timeAsyncValidatorExtension(config?: TimeConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.time, baseAsyncValidator(config, AnnotationTypes.time));
}