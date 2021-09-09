import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
import { StringValueConfig } from "../models/config/string-value-config";
export function endsWithValidator(configModel: StringValueConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
      if (ValidatorValueChecker.pass(control, config)) {
          let failed = false;
          let values = config.values ? config.values : [config.value];
          for (let value of values) {
              var endString = String(control.value).substr(control.value.length - value.length, value.length);
              failed = (endString != value);
              if (!failed)
                  break;
          }
          if (failed)
            return ObjectMaker.toJson(AnnotationTypes.endsWith, config, [control.value, config.value]);
    }
    return ObjectMaker.null();
  }
}
