import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { DefaultConfig } from "../models/config/default-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
export function jsonValidator(configModel: DefaultConfig): ValidatorFn {
  function process(value) {
    var result: boolean = false;
    try {
      var json = JSON.parse(value);
      result = !!json && typeof json === 'object'
    }
    catch (ex) {
      result = false;
    }
    return result;
  }

  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      if (process(control.value))
        return ObjectMaker.toJson(AnnotationTypes.json, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
