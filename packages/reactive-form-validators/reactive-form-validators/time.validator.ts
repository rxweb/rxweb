import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { TimeConfig } from "../models/config/time-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function timeValidator(config: TimeConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
          if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                var testResult = false;
                testResult = config.allowSeconds ? RegexValidator.isValid(control.value, RegExRule.timeWithSeconds) :  RegexValidator.isValid(control.value, RegExRule.time);
                if (!testResult)
                    return ObjectMaker.toJson(AnnotationTypes.time, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}
