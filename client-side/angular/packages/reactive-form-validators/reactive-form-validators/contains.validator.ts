import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { DefaultConfig } from "../models/config/default-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { getConfigObject } from "../util/config-provider"
export function containsValidator(configModel: DefaultConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let config = getConfigObject(configModel, control);
        if (ValidatorValueChecker.pass(control, config)) {
            let failed = false;
            const values = config.values ? config.values : [config.value];
            for (let value of values) {
                failed = control.value.indexOf(value) == -1;
                if (!failed)
                    break;
            }
            if (failed)
                return ObjectMaker.toJson(AnnotationTypes.contains, config, [control.value, config.value]);
        }
        return ObjectMaker.null();
    }
}
