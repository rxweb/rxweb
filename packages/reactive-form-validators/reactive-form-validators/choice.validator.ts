import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { ChoiceConfig } from "../models/config/choice-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";

export function choiceValidator(config: ChoiceConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject)) {
            config.minLength = (config.minLength == undefined) ? 0: config.minLength;
            config.maxLength = (config.maxLength == undefined) ? 0: config.maxLength;
            if (controlValue instanceof Array) {
                var testResult = ((config.minLength <= controlValue.length && config.maxLength == 0) || (config.maxLength >= controlValue.length))  
                if (!testResult)
                    return ObjectMaker.toJson(AnnotationTypes.choice, config.message || null, [controlValue]);
            }
        } return ObjectMaker.null();
    }
}
