import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
import { NUMBER_CONFIG } from "../const/config-names.const";
export function maxNumberValidator(configModel: NumberConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control,NUMBER_CONFIG);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!(parseFloat(control.value) <= config.value))
        return ObjectMaker.toJson(AnnotationTypes.maxNumber, config, [control.value, config.value])
    }
    return ObjectMaker.null();
  }
}
