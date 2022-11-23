import {
    ValidatorFn
} from "@angular/forms";
import { BaseConfig } from "../models/config/base-config";
import { oddValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function oddValidatorExtension(config?: BaseConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.odd, oddValidator(config))
}
