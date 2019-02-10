import {
    ValidatorFn
} from "@angular/forms";
import { MaxDateConfig } from "../models/config/max-date-config";
import { maxDateValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function maxDateValidatorExtension(config?: MaxDateConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.maxDate, maxDateValidator(config))
}
