import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { MinDateConfig } from "../models/config/min-date-config";
import { AnnotationTypes } from "../core/validator.static";
import { dateChecker } from "../util/date-checker.function";
export function minDateValidator(configModel: MinDateConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return dateChecker(control, configModel, AnnotationTypes.minDate);
  }
}
