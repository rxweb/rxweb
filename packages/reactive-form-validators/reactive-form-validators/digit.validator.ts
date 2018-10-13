import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { DigitConfig } from "../models/config/digit-config";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
export function digitValidator(config:DigitConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
       if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {  
                if (!RegexValidator.isValid(control.value, RegExRule.onlyDigit))
                    return ObjectMaker.toJson(AnnotationTypes.digit, config.message || null, [control.value])
            }
        }
        return ObjectMaker.null();
    }
}
