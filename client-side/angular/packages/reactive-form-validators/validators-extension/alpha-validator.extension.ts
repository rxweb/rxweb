import {
  ValidatorFn
} from "@angular/forms";
import { AlphaConfig } from "../models/config/alpha-config";
import { alphaValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";
export function alphaValidatorExtension(config?: AlphaConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.alpha, alphaValidator(config))
}
