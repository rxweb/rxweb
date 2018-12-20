  import {
    ValidatorFn
} from "@angular/forms";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { greaterThanValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function greaterThanValidatorExtension(config?: RelationalOperatorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.greaterThan, greaterThanValidator(config))
}
