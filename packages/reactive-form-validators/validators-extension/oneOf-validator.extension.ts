import {
    ValidatorFn
} from "@angular/forms";
import { ArrayConfig } from "../models/config/array-config";
import { oneOfValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function oneOfValidatorExtension(config?: ArrayConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.oneOf, oneOfValidator(config))
}
