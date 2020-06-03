import {
  ValidatorFn
} from "@angular/forms";
import { ContainsConfig } from "../models/config/contains-config";
import { containsValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function containsValidatorExtension(config?: ContainsConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.contains, containsValidator(config))
}
