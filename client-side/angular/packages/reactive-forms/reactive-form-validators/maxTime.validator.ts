import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'


import { MaxTimeConfig } from "../models/config/time-config";
import { AnnotationTypes } from "../core/validator.static";
import { timeChecker } from "../util/time-checker.function";
export function maxTimeValidator(configModel: MaxTimeConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null=> {
      return timeChecker(control, configModel, AnnotationTypes.maxTime);
  }
}
