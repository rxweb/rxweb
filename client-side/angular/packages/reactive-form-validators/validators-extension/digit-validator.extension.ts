import {
    ValidatorFn
} from "@angular/forms";
import { DigitConfig } from "../models/config/digit-config";
import { digitValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function digitValidatorExtension(config?: DigitConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.digit, digitValidator(config))
}
