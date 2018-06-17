import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { DefaultConfig } from "../models/config/default-config";
import { ApplicationUtil } from "../util/app-util";
import { Linq } from "../util/linq";
import { AnnotationTypes } from "../core/validator.static";

export function containsValidator(config:DefaultConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        debugger;
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        if (Linq.IsPassed(formGroupValue, config.conditionalExpressions)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                if (controlValue.indexOf(config.value) == -1)
                    return ObjectMaker.toJson(AnnotationTypes.contains, config.message || null, [controlValue]);
            }
        }
        return ObjectMaker.null();
    }
}
