import {
    ValidatorFn
} from "@angular/forms";
import { ExtensionConfig} from "../models/config/extension-config";
import { extensionValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function extensionValidatorExtension(config: ExtensionConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.extension, (control) => { return null })
}
