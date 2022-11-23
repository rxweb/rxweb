import {
    AsyncValidatorFn,   ValidatorFn
} from "@angular/forms";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { greaterThanEqualToValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function greaterThanEqualToValidatorExtension(config?: RelationalOperatorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.greaterThanEqualTo, greaterThanEqualToValidator(config))
}
export function greaterThanEqualToAsyncValidatorExtension(config?: RelationalOperatorConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.greaterThanEqualTo, baseAsyncValidator(config, AnnotationTypes.greaterThanEqualTo));
}