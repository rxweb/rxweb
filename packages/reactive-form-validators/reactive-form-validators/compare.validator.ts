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
import { ObjectMaker } from "../util/object-maker";
import { INVALID } from "../const/validator.const"
import { CompareConfig } from "../models/config/compare-config";
import { AnnotationTypes } from "../core/validator.static";
import { ApplicationUtil } from '../util/app-util';
export function compareValidator(config:CompareConfig): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        const compareControl : any = ApplicationUtil.getFormControl(config.fieldName,control);
        const controlValue = control.value;
        const compareControlValue = (compareControl) ? compareControl.value : '';
        if (RegexValidator.isNotBlank(controlValue) || RegexValidator.isNotBlank(compareControlValue)) {
            if (!(compareControl && compareControl.value === controlValue))
                return ObjectMaker.toJson(AnnotationTypes.compare, config.message || null, [controlValue, compareControlValue]);
        }
        return ObjectMaker.null();
    }
}
