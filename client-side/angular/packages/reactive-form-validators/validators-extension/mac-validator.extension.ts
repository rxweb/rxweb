import {
    ValidatorFn
} from "@angular/forms";
import { BaseConfig } from "../models/config/base-config";
import { macValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function macValidatorExtension(config?: BaseConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.mac, macValidator(config))
}
