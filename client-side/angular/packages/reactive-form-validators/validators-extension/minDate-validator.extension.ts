import {
    AsyncValidatorFn, ValidatorFn
} from "@angular/forms";
import { MinDateConfig } from "../models/config/min-date-config";
import { minDateValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function minDateValidatorExtension(config?: MinDateConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.minDate, minDateValidator(config))
}
export function minDateAsyncValidatorExtension(config?: MinDateConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.minDate, baseAsyncValidator(config, AnnotationTypes.minDate));
}