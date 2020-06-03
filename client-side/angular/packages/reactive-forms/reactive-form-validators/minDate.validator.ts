import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'
import { MinDateConfig } from "../models/config/min-date-config";
import { AnnotationTypes } from "../core/validator.static";
import { dateChecker } from "../util/date-checker.function";
export function minDateValidator(configModel: MinDateConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null=> {
    return dateChecker(control, configModel, AnnotationTypes.minDate);
  }
}
