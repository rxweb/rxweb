import {
    AsyncValidatorFn, ValidatorFn
} from "@angular/forms";
import { PasswordConfig } from "../models/config/password-config";
import { passwordValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function passwordcValidatorExtension(config: PasswordConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.password, passwordValidator(config))
}
export function passwordAsyncValidatorExtension(config?: PasswordConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.password, baseAsyncValidator(config, AnnotationTypes.password));
}