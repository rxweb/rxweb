import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function primeNumberValidator(configModel: BaseConfig): ValidatorFn {
  function isPrime(value) {
    let isPrimeNumber = value != 1;
    for (var i = 2; i < value; i++) {
      if (value % i == 0) {
        isPrimeNumber = false;
        break;
      }
    }
    return isPrimeNumber;
  }
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!ApplicationUtil.isNumeric(control.value) || !isPrime(control.value))
        return ObjectMaker.toJson(AnnotationTypes.primeNumber, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
