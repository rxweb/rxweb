import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { DefaultConfig } from "../models/config/default-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function startsWithValidator(config: DefaultConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = getConfigObject(config,control);
    if (ValidatorValueChecker.pass(control, config)) {
      var startString = String(control.value).substr(0, config.value.length);
      if (startString != config.value)
        return ObjectMaker.toJson(AnnotationTypes.startsWith, config, [control.value, config.value]);
    }
    return ObjectMaker.null();
  }
}
