import {
    ValidatorFn
} from "@angular/forms";
import { MinDateConfig } from "../models/config/min-date-config";
import { minDateValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function minDateValidatorExtension(config?: MinDateConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.minDate, minDateValidator(config))
}
