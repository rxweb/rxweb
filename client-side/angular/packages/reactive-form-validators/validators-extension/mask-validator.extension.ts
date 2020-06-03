import {
  ValidatorFn
} from "@angular/forms";
import { maskValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";
import { MaskConfig } from "../models/config/mask-config";
export function maskValidatorExtension(config?: MaskConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.mask, maskValidator(config))
}
