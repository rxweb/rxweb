import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { LogicalOperatorConfig } from "../models/config/logical-operator-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";
import { APP_VALIDATORS } from "../const/app-validators.const"
export function andValidator(configModel: LogicalOperatorConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
    if (ValidatorValueChecker.pass(control, config)) {
      let validatorNames = Object.keys(config.validation);
      let failed:boolean = false;
      for(var validatorName of validatorNames){
        failed = typeof config.validation[validatorName] == "boolean" ?  APP_VALIDATORS[validatorName]()(control) :  APP_VALIDATORS[validatorName](config.validation[validatorName])(control);
        if(failed)
          break;
      }
      if (failed)
        return ObjectMaker.toJson(AnnotationTypes.and, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
