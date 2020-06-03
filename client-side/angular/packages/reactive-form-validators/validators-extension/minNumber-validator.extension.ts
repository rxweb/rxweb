import {
    ValidatorFn
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { minNumberValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function minNumberValidatorExtension(config?: NumberConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.minNumber, minNumberValidator(config))
}
