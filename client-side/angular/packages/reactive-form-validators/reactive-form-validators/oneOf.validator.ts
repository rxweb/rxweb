import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { ArrayConfig } from "../models/config/array-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";
import { ARRAY_CONFIG } from "../const/config-names.const";
import { ApplicationUtil } from "../util/app-util";
export function oneOfValidator(configModel: ArrayConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let config = getConfigObject(configModel, control, ARRAY_CONFIG);
        if (ValidatorValueChecker.passArrayValue(control, config)) {
            var testResult = false;
            for (let value of config.matchValues) {
                let matchValue = ApplicationUtil.lowerCaseWithTrim(value);
                testResult = Array.isArray(control.value) ? control.value.some((y) => ApplicationUtil.lowerCaseWithTrim(y) === matchValue) : ApplicationUtil.lowerCaseWithTrim(control.value) === matchValue;
                if (testResult)
                    break;
            }
            if (!testResult)
                return ObjectMaker.toJson(AnnotationTypes.oneOf, config, [control.value]);
        }
        return ObjectMaker.null();
    }
}
