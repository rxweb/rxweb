import {
    AsyncValidatorFn,  ValidatorFn
} from "@angular/forms";
import { ChoiceConfig } from "../models/config/choice-config";
import { choiceValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator, baseAsyncValidatorExtension } from "./base-validator.function";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function choiceValidatorExtension(config?: ChoiceConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.choice, choiceValidator(config))
}
export function choiceAsyncValidatorExtension(config?: ChoiceConfig): AsyncValidatorFn {
    return baseAsyncValidatorExtension(config, AnnotationTypes.choice, baseAsyncValidator(config, AnnotationTypes.choice));
}
