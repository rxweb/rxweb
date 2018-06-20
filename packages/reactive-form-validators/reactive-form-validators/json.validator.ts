import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { DefaultConfig } from "../models/config/default-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";

export function jsonValidator(config: DefaultConfig, conditionalValidationProps: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpressions, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                try {
                    var json = JSON.parse(controlValue)
                } catch(ex){
                    return ObjectMaker.toJson(AnnotationTypes.json, config.message || null, [controlValue]);
                }
            }
        } return ObjectMaker.null();
    }
}
