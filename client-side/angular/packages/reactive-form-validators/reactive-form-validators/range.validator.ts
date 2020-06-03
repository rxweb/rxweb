import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { RangeConfig } from "../models/config/range-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
import { RANGE_CONFIG } from "../const/config-names.const";
export function rangeValidator(configModel: RangeConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let config = getConfigObject(configModel,control,RANGE_CONFIG);
      if (ValidatorValueChecker.pass(control, config)) {
          if (!(control.value && parseFloat(control.value) >= config.minimumNumber && parseFloat(control.value) <= config.maximumNumber))
        return ObjectMaker.toJson(AnnotationTypes.range, config, [control.value, config.minimumNumber, config.maximumNumber])
    }
    return ObjectMaker.null();
  }
}
