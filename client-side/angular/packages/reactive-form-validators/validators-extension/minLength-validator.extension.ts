import {
    ValidatorFn
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { minLengthValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function minLengthValidatorExtension(config?: NumberConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.minLength, minLengthValidator(config))
}
