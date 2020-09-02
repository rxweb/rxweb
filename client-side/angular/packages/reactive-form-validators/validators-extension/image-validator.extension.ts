import {
    AsyncValidatorFn,  ValidatorFn
} from "@angular/forms";
import { ImageConfig } from "../models/config/image-config";
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function imageValidatorExtension(config: ImageConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.image, (control) => { return null })
}
export function imageAsyncValidatorExtension(config?: ImageConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.image, baseAsyncValidator(config, AnnotationTypes.image));
}