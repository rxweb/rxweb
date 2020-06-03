import {
    ValidatorFn
} from "@angular/forms";
import { DifferentConfig } from "../models/config/compare-config";
import { differentValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function differentValidatorExtension(config?: DifferentConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.different, differentValidator(config))
}
