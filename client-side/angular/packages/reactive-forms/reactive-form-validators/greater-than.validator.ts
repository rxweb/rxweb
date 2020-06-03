import { ValidatorFn } from '../models/interface/validator-fn'

import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { relationalCheck } from "../util/relational-checker.function";
import { AbstractControl } from "../abstract/abstract-control";
export function greaterThanValidator(configModel: RelationalOperatorConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    return relationalCheck(control, configModel, AnnotationTypes.greaterThan)
  }
}
