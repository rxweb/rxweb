import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'
import { MaxDateConfig } from "../models/config/max-date-config";
import { AnnotationTypes } from "../core/validator.static";
import { dateChecker } from "../util/date-checker.function";
export function maxDateValidator(configModel: MaxDateConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    return dateChecker(control, configModel, AnnotationTypes.maxDate);
  }
}
