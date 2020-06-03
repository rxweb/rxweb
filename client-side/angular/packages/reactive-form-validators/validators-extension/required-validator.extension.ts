import {
    ValidatorFn
} from "@angular/forms";
import { MessageConfig } from "../models/config/message-config";
import { requiredValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function requiredValidatorExtension(config?: MessageConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.required, requiredValidator(config))
}
