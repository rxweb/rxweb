import {
    AsyncValidatorFn, ValidatorFn
} from "@angular/forms";
import { MaxDateConfig } from "../models/config/max-date-config";
import { maxDateValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function maxDateValidatorExtension(config?: MaxDateConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.maxDate, maxDateValidator(config))
}
export function maxDateAsyncValidatorExtension(config?: MaxDateConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.maxDate, baseAsyncValidator(config, AnnotationTypes.maxDate));
}