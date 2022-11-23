import {
    AsyncValidatorFn, ValidatorFn
} from "@angular/forms";
import { endsWithValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";
import { StringValueConfig } from "../models/config/string-value-config";

export function endsWithValidatorExtension(config: StringValueConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.endsWith, endsWithValidator(config))
}
export function endsWithAsyncValidatorExtension(config?: StringValueConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.endsWith, baseAsyncValidator(config, AnnotationTypes.endsWith));
}