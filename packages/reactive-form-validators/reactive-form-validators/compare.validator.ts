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
import { CompareConfig } from "../models/config/compare-config";
import { AnnotationTypes } from "../core/validator.static";

export function compareValidator(config:CompareConfig): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
        const compareControl = control.root.get([config.fieldName]);
        const controlValue = control.value;
        const compareControlValue = (compareControl) ? compareControl.value : '';
        if (RegexValidator.isNotBlank(controlValue) && compareControl && compareControl.value === controlValue) {
            if (compareControl.status === INVALID)
                compareControl.updateValueAndValidity();
            return null;
        }
        return ObjectMaker.toJson(AnnotationTypes.compare, config.message || null, [controlValue, compareControlValue]);
    }
}
