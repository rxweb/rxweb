import {
    AsyncValidatorFn,  ValidatorFn
} from "@angular/forms";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { lessThanEqualToValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function lessThanEqualToValidatorExtension(config?: RelationalOperatorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.lessThanEqualTo, lessThanEqualToValidator(config))
}
export function lessThanEqualToAsyncValidatorExtension(config?: RelationalOperatorConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.lessThanEqualTo, baseAsyncValidator(config, AnnotationTypes.lessThanEqualTo));
}