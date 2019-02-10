import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { MaxDateConfig } from "../models/config/max-date-config";
import { AnnotationTypes } from "../core/validator.static";
import { dateChecker } from "../util/date-checker.function";
export function maxDateValidator(config: MaxDateConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return dateChecker(control, config, AnnotationTypes.maxDate);
  }
}
