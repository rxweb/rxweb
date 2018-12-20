import {
    ValidatorFn
} from "@angular/forms";
import { ArrayConfig } from "../models/config/array-config";
import { noneOfValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function noneOfValidatorExtension(config?: ArrayConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.noneOf, noneOfValidator(config))
}
