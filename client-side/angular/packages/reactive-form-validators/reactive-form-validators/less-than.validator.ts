import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { relationalCheck } from "../util/relational-checker.function";
export function lessThanValidator(configModel: RelationalOperatorConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return relationalCheck(control, configModel, AnnotationTypes.lessThan)
  }
}
