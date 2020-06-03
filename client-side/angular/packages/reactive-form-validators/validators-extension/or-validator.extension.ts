import {
  ValidatorFn
} from "@angular/forms";
import { LogicalOperatorConfig } from "../models/config/logical-operator-config";
import { orValidator } from '../reactive-form-validators/or.validator'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";
export function orValidatorExtension(config?: LogicalOperatorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.or, orValidator(config))
}
