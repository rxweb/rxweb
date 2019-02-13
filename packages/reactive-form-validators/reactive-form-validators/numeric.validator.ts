import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { NumericConfig } from "../models/config/numeric-config";
import { AnnotationTypes } from "../core/validator.static";
import { ApplicationUtil } from '../util/app-util';
import { ValidatorValueChecker } from "../util/validator-value-checker";
import { VALIDATOR_CONFIG  } from "../const/app.const"
export function numericValidator(config: NumericConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (config && (!control[VALIDATOR_CONFIG] || !control[VALIDATOR_CONFIG][AnnotationTypes.numeric]))
            ApplicationUtil.configureControl(control, config, AnnotationTypes.numeric);
        config = ApplicationUtil.getConfigObject(config);
        if (ValidatorValueChecker.pass(control, config)) {
            if (!RegexValidator.isValid(control.value, ApplicationUtil.numericValidation(config.allowDecimal, config.acceptValue)))
                return ObjectMaker.toJson(AnnotationTypes.numeric, config, [control.value]);
        }
        return ObjectMaker.null();
    }
}
