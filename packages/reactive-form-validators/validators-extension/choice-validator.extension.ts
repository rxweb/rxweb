import {
    ValidatorFn
} from "@angular/forms";
import { ChoiceConfig } from "../models/config/choice-config";
import { choiceValidator  } from '../reactive-form-validators/index'
import { AnnotationTypes } from "../core/validator.static"
import { baseValidator } from "./base-validator.function";

export function choiceValidatorExtension(config?: ChoiceConfig): ValidatorFn {
  return baseValidator(config, AnnotationTypes.choice, choiceValidator(config))
}
