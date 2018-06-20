import {
    FormGroup,
    FormBuilder,
    Validators,
    Validator,
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { INVALID } from "../const/validator.const"
import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";

export function greaterThanValidator(config: RelationalOperatorConfig): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
        const matchControl = control.root.get([config.fieldName]);
        const controlValue = control.value;
        const matchControlValue = (matchControl) ? matchControl.value : '';
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpressions, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                if (!(matchControl && controlValue > matchControlValue))
                    return ObjectMaker.toJson(AnnotationTypes.greaterThan, config.message || null, [controlValue, matchControlValue]);
            }
        }
        return ObjectMaker.null();
    }
}
