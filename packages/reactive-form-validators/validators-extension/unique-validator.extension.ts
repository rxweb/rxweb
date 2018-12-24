import {
    ValidatorFn
} from "@angular/forms";
import { UniqueConfig} from "../models/config/unique-config";
import { uniqueValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function uniqueValidatorExtension(config?: UniqueConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.unique, uniqueValidator(config))
}
