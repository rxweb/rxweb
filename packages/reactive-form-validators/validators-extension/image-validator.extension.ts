import {
    ValidatorFn
} from "@angular/forms";
import { ImageConfig } from "../models/config/image-config";
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function imageValidatorExtension(config: ImageConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.image, (control) => { return null })
}
