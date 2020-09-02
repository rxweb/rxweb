import {
    AsyncValidatorFn, ValidatorFn
} from "@angular/forms";
import { MinTimeConfig } from "../models/config/time-config";
import { minTimeValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function minTimeValidatorExtension(config?: MinTimeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.minTime, minTimeValidator(config))
}
export function minTimeAsyncValidatorExtension(config?: MinTimeConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.minTime, baseAsyncValidator(config, AnnotationTypes.minTime));
}