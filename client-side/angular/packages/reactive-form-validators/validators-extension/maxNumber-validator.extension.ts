import {
    AsyncValidatorFn,  ValidatorFn
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { maxNumberValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function maxNumberValidatorExtension(config?: NumberConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.maxNumber, maxNumberValidator(config))
}
export function maxNumberAsyncValidatorExtension(config?: NumberConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.maxNumber, baseAsyncValidator(config, AnnotationTypes.maxNumber));
}