import {
    ValidatorFn
} from "@angular/forms";
import { RangeConfig } from "../models/config/range-config";
import { rangeValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function rangeValidatorExtension(config?: RangeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.range, rangeValidator(config))
}
