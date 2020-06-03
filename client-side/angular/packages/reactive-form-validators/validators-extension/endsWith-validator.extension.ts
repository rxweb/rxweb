import {
    ValidatorFn
} from "@angular/forms";
import { DefaultConfig} from "../models/config/default-config";
import { endsWithValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function endsWithValidatorExtension(config: DefaultConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.endsWith, endsWithValidator(config))
}
