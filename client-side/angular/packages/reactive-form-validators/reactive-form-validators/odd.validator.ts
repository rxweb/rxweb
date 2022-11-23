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
export function oddValidator(configModel: BaseConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      if (!(!(control.value % 2 == 0)) || !ApplicationUtil.isNumeric(control.value))
        return ObjectMaker.toJson(AnnotationTypes.odd, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
