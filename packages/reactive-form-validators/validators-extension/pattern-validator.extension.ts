import {
    ValidatorFn
} from "@angular/forms";
import { PatternConfig } from "../models/config/pattern-config";
import { patternValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function patternValidatorExtension(config?: PatternConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.pattern, patternValidator(config))
}
