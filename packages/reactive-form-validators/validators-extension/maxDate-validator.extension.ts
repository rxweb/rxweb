import {
    ValidatorFn
} from "@angular/forms";
import { DateConfig } from "../models/config/date-config";
import { maxDateValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function maxDateValidatorExtension(config?: DateConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.maxDate, maxDateValidator(config))
}
