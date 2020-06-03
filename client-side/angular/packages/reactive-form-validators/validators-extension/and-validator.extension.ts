import {
  ValidatorFn
} from "@angular/forms";
import { LogicalOperatorConfig } from "../models/config/logical-operator-config";
import { andValidator } from '../reactive-form-validators/and.validator'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";
export function andValidatorExtension(config?: LogicalOperatorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.and, andValidator(config))
}
