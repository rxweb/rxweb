import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { BaseConfig } from "../models/config/base-config";
import { AnnotationTypes } from "../core/validator.static";
import { validateDate } from "../util/date-checker.function";
export function dateValidator(configModel: BaseConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return validateDate(control, configModel, AnnotationTypes.date);
  }
}
