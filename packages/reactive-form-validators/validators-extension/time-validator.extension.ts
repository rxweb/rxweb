import {
    ValidatorFn
} from "@angular/forms";
import { TimeConfig } from "../models/config/time-config";
import { timeValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function timeValidatorExtension(config?: TimeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.time, timeValidator(config))
}
