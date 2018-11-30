import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { AlphaConfig } from "../models/config/alpha-config";
import { Linq } from "../util/linq";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function alphaNumericValidator(config: AlphaConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                var testResult = (!config.allowWhiteSpace) ?
                                  RegexValidator.isValid(control.value, RegExRule.alphaNumeric) :
                                  RegexValidator.isValid(control.value, RegExRule.alphaNumericWithSpace);
                if (!testResult)
                    return ObjectMaker.toJson(AnnotationTypes.alphaNumeric, config.message || null, [control.value]);
            }
        }
        return ObjectMaker.null();
    }
}
