import {
  ValidatorFn
} from "@angular/forms";
import { BaseConfig} from "../models/config/base-config";
import { cusipValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";
export function cusipValidatorExtension(config?: BaseConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.cusip, cusipValidator(config))
}
