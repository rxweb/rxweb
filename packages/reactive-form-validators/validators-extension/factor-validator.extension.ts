import {
    ValidatorFn
} from "@angular/forms";
import { FactorConfig } from "../models/config/factor-config";
import { factorValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function factorValidatorExtension(config?: FactorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.factor, factorValidator(config))
}
