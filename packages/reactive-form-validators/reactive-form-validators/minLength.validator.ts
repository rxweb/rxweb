import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function minLengthValidator(config: NumberConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = getConfigObject(config,control);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!(String(control.value).length >= config.value))
        return ObjectMaker.toJson(AnnotationTypes.minLength, config, [control.value, config.value])
    }
    return ObjectMaker.null();
  }
}
