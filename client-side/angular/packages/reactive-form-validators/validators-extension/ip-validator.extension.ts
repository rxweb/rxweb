import {
  AsyncValidatorFn,ValidatorFn
} from "@angular/forms";
import { IpConfig } from "../models/config/ip-config";
import { ipValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";
export function ipValidatorExtension(config?: IpConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.ip, ipValidator(config))
}
export function ipAsyncValidatorExtension(config?: IpConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.ip, baseAsyncValidator(config, AnnotationTypes.ip));
}