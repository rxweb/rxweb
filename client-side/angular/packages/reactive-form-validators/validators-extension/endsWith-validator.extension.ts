import {
    AsyncValidatorFn, ValidatorFn
} from "@angular/forms";
import { DefaultConfig} from "../models/config/default-config";
import { endsWithValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function endsWithValidatorExtension(config: DefaultConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.endsWith, endsWithValidator(config))
}
export function endsWithAsyncValidatorExtension(config?: DefaultConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.endsWith, baseAsyncValidator(config, AnnotationTypes.endsWith));
}