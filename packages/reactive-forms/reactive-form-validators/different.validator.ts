import { AbstractControl } from "../abstract/abstract-control"
import { ValidatorFn } from '../models/interface/validator-fn'

import { ObjectMaker } from "../util/object-maker";
import { DifferentConfig } from "../models/config/compare-config";
import { AnnotationTypes } from "../core/validator.static";
import { ApplicationUtil } from "../util/app-util";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider"
import { FIELD_CONFIG } from "../const/config-names.const";
export function differentValidator(configModel: DifferentConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
    let config = getConfigObject(configModel,control,FIELD_CONFIG);
    if (ValidatorValueChecker.pass(control, config)) {
      const differentControl = ApplicationUtil.getFormControl(config.fieldName, control);
      const differentControlValue = (differentControl) ? differentControl.value : '';
      if (!(differentControl && differentControl.value != control.value))
        return ObjectMaker.toJson(AnnotationTypes.different, config, [control.value, differentControlValue]);
    }
    return ObjectMaker.null();
  }
}
