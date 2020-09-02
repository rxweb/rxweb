import {
    AsyncValidatorFn,    ValidatorFn
} from "@angular/forms";
import { FileConfig } from "../models/config/file-config";
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function fileValidatorExtension(config: FileConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.file, (control) => { return null })
}
export function fileAsyncValidatorExtension(config?: FileConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.file, baseAsyncValidator(config, AnnotationTypes.file));
}