import {
  ValidatorFn
} from "@angular/forms";
import { BaseConfig } from "../models/config/base-config";
import { gridValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";
export function gridValidatorExtension(config?: BaseConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.grid, gridValidator(config))
}
