import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider";
import { StringComparisonConfig } from "../models/config/string-comparison-config";
export function startsWithValidator(configModel: StringComparisonConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            let failed = false;
            let values = config.values ? config.values : [config.value];
            for (let value of values) {
                let startString = String(control.value).substr(0, value.length);
                failed = (config.isRestrict && String(startString).toLowerCase() == String(value).toLowerCase()) || (!config.isRestrict && startString != value)
                if (!failed)
                    break;
            }
            if (failed)
                return ObjectMaker.toJson(AnnotationTypes.startsWith, config, [control.value, config.value]);
        }
        return ObjectMaker.null();
    }
}
