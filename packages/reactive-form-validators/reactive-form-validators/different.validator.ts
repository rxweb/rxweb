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
import { DifferentConfig } from "../models/config/compare-config";
import { AnnotationTypes } from "../core/validator.static";

export function differentValidator(config:DifferentConfig): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
        const differentControl = control.root.get([config.fieldName]);
        const controlValue = control.value;
        const differentControlValue = (differentControl) ? differentControl.value : '';
        if (RegexValidator.isNotBlank(controlValue)) {
            if (!(differentControl && differentControl.value != controlValue))
                return ObjectMaker.toJson(AnnotationTypes.different, config.message || null, [controlValue, differentControlValue]);
        }
        return ObjectMaker.null();
    }
}
