import {
    ValidatorFn
} from "@angular/forms";
import { startsWithValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";
import { StringComparisonConfig } from "../models/config/string-comparison-config";

export function startsWithValidatorExtension(config: StringComparisonConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.startsWithWith, startsWithValidator(config))
}
