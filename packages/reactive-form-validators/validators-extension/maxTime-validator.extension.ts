import {
    ValidatorFn
} from "@angular/forms";
import { MaxTimeConfig } from "../models/config/time-config";
import { maxTimeValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function maxTimeValidatorExtension(config?: MaxTimeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.maxTime, maxTimeValidator(config))
}
