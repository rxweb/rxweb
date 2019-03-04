import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { ArrayConfig } from "../models/config/array-config";
import { AnnotationTypes } from "../core/validator.static";
import { ApplicationUtil } from "../util/app-util";
import { FormProvider } from "../util/form-provider";
export function noneOfValidator(config: ArrayConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control, config)) {
            var testResult = false; 
            for (let value of config.matchValues) {
                let matchValue = ApplicationUtil.lowerCaseWithTrim(value);
                testResult = Array.isArray(control.value) ? control.value.some((y) => ApplicationUtil.lowerCaseWithTrim(y) === matchValue) : ApplicationUtil.lowerCaseWithTrim(control.value) === matchValue;
                if (testResult)
                    break;
            }
            if (testResult)
                return ObjectMaker.toJson(AnnotationTypes.noneOf, config, [control.value]);
        }
        return ObjectMaker.null();
    }
}
