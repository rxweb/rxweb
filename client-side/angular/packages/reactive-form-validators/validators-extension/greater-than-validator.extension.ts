  import {
    AsyncValidatorFn,ValidatorFn
} from "@angular/forms";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { greaterThanValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function greaterThanValidatorExtension(config?: RelationalOperatorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.greaterThan, greaterThanValidator(config))
}
export function greaterThanAsyncValidatorExtension(config?: RelationalOperatorConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.greaterThan, baseAsyncValidator(config, AnnotationTypes.greaterThan));
}