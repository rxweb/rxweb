import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { ArrayConfig } from "../models/config/array-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";

export function noneOfValidator(config: ArrayConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject)) {
            if (controlValue instanceof Array) {
                var testResult = false;
                for(let value of config.matchValues){
                     testResult = controlValue.some((y) => y == value);
                    if(testResult)
                     break;
                }
                if (testResult)
                    return ObjectMaker.toJson(AnnotationTypes.noneOf, config.message || null, [controlValue]);
            }
        } return ObjectMaker.null();
    }
}
