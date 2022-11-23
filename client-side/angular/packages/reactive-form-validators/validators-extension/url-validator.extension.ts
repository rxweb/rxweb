import {
    AsyncValidatorFn,  ValidatorFn
} from "@angular/forms";
import { urlValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { UrlConfig } from "../models/config/url-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function urlValidatorExtension(config?: UrlConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.url, urlValidator(config))
}
export function urlAsyncValidatorExtension(config?: UrlConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.url, baseAsyncValidator(config, AnnotationTypes.url));
}