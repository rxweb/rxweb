import {
    ValidatorFn
} from "@angular/forms";
import { MinTimeConfig } from "../models/config/time-config";
import { minTimeValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function minTimeValidatorExtension(config?: MinTimeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.minTime, minTimeValidator(config))
}
