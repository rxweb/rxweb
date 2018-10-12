import {
    FormGroup,
    FormBuilder,
    Validators,
    Validator,
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { INVALID } from "../const/validator.const"
import { DifferentConfig } from "../models/config/compare-config";
import { AnnotationTypes } from "../core/validator.static";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { FormProvider } from '../util/form-provider';
export function differentValidator(config:DifferentConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
      const differentControl = control.root.get([config.fieldName]);
      const differentControlValue = (differentControl) ? differentControl.value : '';
        if (FormProvider.ProcessRule(control,config)) {
        if (RegexValidator.isNotBlank(control.value)) {
          if (!(differentControl && differentControl.value != control.value))
            return ObjectMaker.toJson(AnnotationTypes.different, config.message || null, [control.value, differentControlValue]);
        }
      }
        return ObjectMaker.null();
    }
}
