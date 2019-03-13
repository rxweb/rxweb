import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { NumberConfig } from "../models/config/number-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function maxLengthValidator(configModel: NumberConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!(control.value.length <= config.value))
        return ObjectMaker.toJson(AnnotationTypes.maxLength, config, [control.value, config.value])
    }
    return ObjectMaker.null();
  }
}
