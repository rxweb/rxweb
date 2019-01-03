import {
  FormGroup,
  ValidatorFn,
} from "@angular/forms";

import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { relationalCheck } from "../util/relational-checker.function";
export function greaterThanEqualToValidator(config: RelationalOperatorConfig): ValidatorFn {
  return (control: FormGroup): { [key: string]: any } => {
    return relationalCheck(control, config, AnnotationTypes.greaterThanEqualTo)
  }
}
