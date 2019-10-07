import {
    ValidatorFn
} from "@angular/forms";
import { DefaultConfig } from "../models/config/default-config";
import { urlValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";
import { UrlConfig } from "../models/config/url-config";

export function urlValidatorExtension(config?: UrlConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.url, urlValidator(config))
}
