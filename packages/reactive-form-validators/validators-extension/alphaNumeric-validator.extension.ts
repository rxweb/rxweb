import {
    ValidatorFn
} from "@angular/forms";
import { AlphaConfig } from '../models/config/alpha-config';
import { alphaNumericValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function alphaNumericValidatorExtension(config?: AlphaConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.alphaNumeric, alphaNumericValidator(config))
}
