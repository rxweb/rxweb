import {
    AsyncValidatorFn, ValidatorFn
} from "@angular/forms";
import { ExtensionConfig} from "../models/config/extension-config";
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function extensionValidatorExtension(config: ExtensionConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.extension, (control) => { return null })
}
export function extensionAsyncValidatorExtension(config?: ExtensionConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.extension, baseAsyncValidator(config, AnnotationTypes.extension));
}