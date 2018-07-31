import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { AlphaConfig } from "../models/config/alpha-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";

export function alphaValidator(config: AlphaConfig, conditionalValidationProps:string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                var testResult = false;
                if (!config.allowWhiteSpace)
                    testResult = RegexValidator.isValid(controlValue, RegExRule.alpha);
                else
                    testResult = RegexValidator.isValid(controlValue, RegExRule.alphaWithSpace);
                if (!testResult)
                    return ObjectMaker.toJson(AnnotationTypes.alpha, config.message || null, [controlValue]);
            }
        } return ObjectMaker.null();
    }
}
