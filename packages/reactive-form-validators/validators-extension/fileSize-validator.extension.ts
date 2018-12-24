import {
    ValidatorFn
} from "@angular/forms";
import { SizeConfig } from "../models/config/size-config";
import { fileSizeValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function fileSizeValidatorExtension(config: SizeConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.fileSize, (control) => { return null })
}
