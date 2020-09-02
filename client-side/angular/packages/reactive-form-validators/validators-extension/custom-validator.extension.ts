import {
    AsyncValidatorFn, ValidatorFn
} from "@angular/forms";
import { CustomConfig } from "../models/config/custom-config";
import { customValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function customValidatorExtension(config?: CustomConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.custom, customValidator(config))
}
export function customAsyncValidatorExtension(config?: CustomConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.custom, baseAsyncValidator(config, AnnotationTypes.custom));
}
