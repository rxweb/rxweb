import {
  FormGroup,
  ValidatorFn,
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { CompareConfig } from "../models/config/compare-config";
import { AnnotationTypes } from "../core/validator.static";
import { ApplicationUtil } from '../util/app-util';
import { getConfigObject } from "../util/config-provider"
export function compareValidator(config: CompareConfig): ValidatorFn {
  return (control: FormGroup): { [key: string]: any } => {
    config = getConfigObject(config,control);
    const compareControl: any = ApplicationUtil.getFormControl(config.fieldName, control);
    const controlValue = control.value;
    const compareControlValue = (compareControl) ? compareControl.value : '';
    if (RegexValidator.isNotBlank(controlValue) || RegexValidator.isNotBlank(compareControlValue)) {
      if (!(compareControl && compareControl.value === controlValue))
        return ObjectMaker.toJson(AnnotationTypes.compare, config, [controlValue, compareControlValue]);
    }
    return ObjectMaker.null();
  }
}
