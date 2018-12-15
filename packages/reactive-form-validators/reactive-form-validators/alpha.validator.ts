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
export function alphaValidator(config: AlphaConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                var testResult = (!config.allowWhiteSpace) ?
                                  RegexValidator.isValid(control.value, RegExRule.alpha) :
                                  RegexValidator.isValid(control.value, RegExRule.alphaWithSpace);
                if (!testResult)
                    return ObjectMaker.toJson(AnnotationTypes.alpha, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}
