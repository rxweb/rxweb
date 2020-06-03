import {
    ValidatorFn
} from "@angular/forms";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { lessThanEqualToValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function lessThanEqualToValidatorExtension(config?: RelationalOperatorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.lessThanEqualTo, lessThanEqualToValidator(config))
}
