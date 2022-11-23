import {
    AsyncValidatorFn,ValidatorFn
} from "@angular/forms";
import { PatternConfig } from "../models/config/pattern-config";
import { patternValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function patternValidatorExtension(config?: PatternConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.pattern, patternValidator(config))
}
export function patternAsyncValidatorExtension(config?: PatternConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.pattern, baseAsyncValidator(config, AnnotationTypes.pattern));
}