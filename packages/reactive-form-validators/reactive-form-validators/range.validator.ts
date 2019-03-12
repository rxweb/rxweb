import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { RangeConfig } from "../models/config/range-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function rangeValidator(config: RangeConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = getConfigObject(config,control);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!(String(control.value).indexOf(".") == -1 && parseInt(control.value) >= config.minimumNumber && parseInt(control.value) <= config.maximumNumber))
        return ObjectMaker.toJson(AnnotationTypes.range, config, [control.value, config.minimumNumber, config.maximumNumber])
    }
    return ObjectMaker.null();
  }
}
