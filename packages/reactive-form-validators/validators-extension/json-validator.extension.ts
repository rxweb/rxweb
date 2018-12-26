import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { DefaultConfig } from "../models/config/default-config";
import { jsonValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function jsonValidatorExtension(config?: DefaultConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.json, jsonValidator(config))
}
