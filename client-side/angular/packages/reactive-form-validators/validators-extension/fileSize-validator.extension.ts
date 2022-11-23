import {
    AsyncValidatorFn,    ValidatorFn
} from "@angular/forms";
import { SizeConfig } from "../models/config/size-config";
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function fileSizeValidatorExtension(config: SizeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.fileSize, (control) => { return null })
}
export function fileSizeAsyncValidatorExtension(config?: SizeConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.fileSize, baseAsyncValidator(config, AnnotationTypes.fileSize));
}