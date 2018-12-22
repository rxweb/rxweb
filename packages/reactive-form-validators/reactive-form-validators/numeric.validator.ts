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
export function numericValidator(config: NumericConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (ValidatorValueChecker.pass(control,config)) {
                if (!RegexValidator.isValid(control.value, ApplicationUtil.numericValidation(config.allowDecimal,config.acceptValue)))
                    return ObjectMaker.toJson(AnnotationTypes.numeric, config, [control.value]);
            }
        return ObjectMaker.null();
    }
}
