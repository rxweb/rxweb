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
            var startString = String(control.value).substr(0, config.value.length);
            if ((config.isRestrict && String(startString).toLowerCase() == String(config.value).toLowerCase()) || (!config.isRestrict && startString != config.value))
                return ObjectMaker.toJson(AnnotationTypes.startsWith, config, [control.value, config.value]);
        }
        return ObjectMaker.null();
    }
}
