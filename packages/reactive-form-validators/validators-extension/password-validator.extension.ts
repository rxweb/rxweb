import {
    ValidatorFn
} from "@angular/forms";
import { PasswordConfig } from "../models/config/password-config";
import { passwordValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function passwordcValidatorExtension(config: PasswordConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.password, passwordValidator(config))
}
