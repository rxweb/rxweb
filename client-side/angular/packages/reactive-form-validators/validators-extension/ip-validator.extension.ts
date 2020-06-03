import {
  ValidatorFn
} from "@angular/forms";
import { IpConfig } from "../models/config/ip-config";
import { ipValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";
export function ipValidatorExtension(config?: IpConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.ip, ipValidator(config))
}
