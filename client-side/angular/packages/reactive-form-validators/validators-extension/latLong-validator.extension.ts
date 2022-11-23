import {
    ValidatorFn
} from "@angular/forms";
import { BaseConfig} from "../models/config/base-config";
import { latLongValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function latLongValidatorExtension(config?: BaseConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.latLong, latLongValidator(config))
}
