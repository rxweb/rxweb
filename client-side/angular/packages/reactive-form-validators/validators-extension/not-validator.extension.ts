import {
  ValidatorFn
} from "@angular/forms";
import { LogicalOperatorConfig } from "../models/config/logical-operator-config";
import { notValidator } from '../reactive-form-validators/not.validator'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";
export function notValidatorExtension(config?: LogicalOperatorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.not, notValidator(config))
}
