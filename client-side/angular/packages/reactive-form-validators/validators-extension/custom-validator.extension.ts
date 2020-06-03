import {
    ValidatorFn
} from "@angular/forms";
import { CustomConfig } from "../models/config/custom-config";
import { customValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function customValidatorExtension(config?: CustomConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.custom, customValidator(config))
}
