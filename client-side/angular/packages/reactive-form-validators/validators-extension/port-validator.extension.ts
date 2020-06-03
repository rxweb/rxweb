import {
    ValidatorFn
} from "@angular/forms";
import { BaseConfig} from "../models/config/base-config";
import { portValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function portValidatorExtension(config?: BaseConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.port, portValidator(config))
}
