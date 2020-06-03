import {
  ValidatorFn
} from "@angular/forms";
import { ArrayConfig } from "../models/config/array-config";
import { allOfValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function allOfValidatorExtension(config?: ArrayConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.allOf, allOfValidator(config))
}
