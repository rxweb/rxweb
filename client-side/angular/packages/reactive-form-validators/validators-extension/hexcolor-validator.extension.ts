import {
    ValidatorFn
} from "@angular/forms";
import { HexColorConfig } from "../models/config/hex-color-config";
import { hexColorValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function hexColorValidatorExtension(config?: HexColorConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.hexColor, hexColorValidator(config))
}
