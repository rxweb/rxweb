import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { DateConfig } from "../models/config/date-config";
import { AnnotationTypes } from "../core/validator.static";
import { dateChecker } from "../util/date-checker.function";
export function maxDateValidator(config: DateConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return dateChecker(control, config, AnnotationTypes.maxDate);
  }
}
