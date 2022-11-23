import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'
import { ObjectMaker } from "../util/object-maker";
import { ArrayConfig } from "../models/config/array-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
import { ARRAY_CONFIG } from "../const/config-names.const";
export function oneOfValidator(configModel: ArrayConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let config = getConfigObject(configModel,control,ARRAY_CONFIG);
    if (ValidatorValueChecker.passArrayValue(control, config)) {
      var testResult = false;
      for (let value of config.matchValues) {
        testResult = control.value.some((y) => y == value);
        if (testResult)
          break;
      }
      if (!testResult)
        return ObjectMaker.toJson(AnnotationTypes.oneOf, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}
