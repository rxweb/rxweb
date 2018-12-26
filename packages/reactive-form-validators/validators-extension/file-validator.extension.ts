import {
    ValidatorFn
} from "@angular/forms";
import { FileConfig } from "../models/config/file-config";
import { fileValidator } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function fileValidatorExtension(config: FileConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.file, (control) => { return null })
}
