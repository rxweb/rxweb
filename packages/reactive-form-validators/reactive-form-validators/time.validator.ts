import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { TimeConfig } from "../models/config/time-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";

export function timeValidator(config: TimeConfig, conditionalValidationProps:string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                var testResult = false;
                let valueLength = 5;
                if (config.allowSeconds)
                    valueLength = 8;
                testResult = RegexValidator.isValid(controlValue, RegExRule.time) && controlValue.length == valueLength;
                if (!testResult)
                    return ObjectMaker.toJson(AnnotationTypes.time, config.message || null, [controlValue]);
            }
        } return ObjectMaker.null();
    }
}
