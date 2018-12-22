import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { BaseConfig } from "../models/config/base-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
export function portValidator(config: BaseConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (ValidatorValueChecker.pass(control,config)) {
            let isValid = RegexValidator.isValid(control.value, RegExRule.onlyDigit) && (control.value >= 0 && control.value <= 65535);
                if (!isValid)
                    return ObjectMaker.toJson(AnnotationTypes.port, config, [control.value]);
            }
        return ObjectMaker.null();
    }
}
