import {
  ValidatorFn
} from "@angular/forms";
import { ComposeConfig } from "../models/config/compose-config";
import { composeValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function composeValidatorExtension(config?: ComposeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.compose, composeValidator(config))
}
