import {
  ValidatorFn
} from "@angular/forms";
import { CompareConfig } from "../models/config/compare-config";
import { compareValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function compareValidatorExtension(config?: CompareConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.compare, compareValidator(config))
}
