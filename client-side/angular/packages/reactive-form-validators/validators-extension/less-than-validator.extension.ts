import {
    AsyncValidatorFn,    ValidatorFn
} from "@angular/forms";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { lessThanValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function lessThanValidatorExtension(config?: RelationalOperatorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.lessThan, lessThanValidator(config))
}
export function lessThanAsyncValidatorExtension(config?: RelationalOperatorConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.lessThan, baseAsyncValidator(config, AnnotationTypes.lessThan));
}