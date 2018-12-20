import {
    ValidatorFn
} from "@angular/forms";
import { NumericConfig } from "../models/config/numeric-config";
import { numericValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function numericValidatorExtension(config?: NumericConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.numeric, numericValidator(config))
}
