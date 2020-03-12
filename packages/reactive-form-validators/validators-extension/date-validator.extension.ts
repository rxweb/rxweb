import {
    ValidatorFn
} from "@angular/forms";
import { BaseDateConfig } from "../models/config/base-date-config";
import { dateValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function dateValidatorExtension(config?: BaseDateConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.date, dateValidator(config))
}
