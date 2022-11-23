import {
    AsyncValidatorFn,  ValidatorFn
} from "@angular/forms";
import { FactorConfig } from "../models/config/factor-config";
import { factorValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function factorValidatorExtension(config?: FactorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.factor, factorValidator(config))
}
export function factorAsyncValidatorExtension(config?: FactorConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.factor, baseAsyncValidator(config, AnnotationTypes.factor));
}