import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { DifferentConfig } from "../models/config/compare-config";
import { AnnotationTypes } from "../core/validator.static";
import { ApplicationUtil } from "../util/app-util";
import { ValidatorValueChecker } from "../util/validator-value-checker";
export function differentValidator(config:DifferentConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (ValidatorValueChecker.pass(control,config)) {
          const differentControl = ApplicationUtil.getFormControl(config.fieldName,control);
          const differentControlValue = (differentControl) ? differentControl.value : '';
          if (!(differentControl && differentControl.value != control.value))
            return ObjectMaker.toJson(AnnotationTypes.different, config, [control.value, differentControlValue]);
        }
        return ObjectMaker.null();
    }
}
