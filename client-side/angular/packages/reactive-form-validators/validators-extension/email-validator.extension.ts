import {
    ValidatorFn
} from "@angular/forms";
import { EmailConfig } from "../models/config/email-config";
import { emailValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function emailValidatorExtension(config?: EmailConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.email, emailValidator(config))
}
