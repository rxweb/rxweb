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
import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function lessThanEqualToValidator(config: RelationalOperatorConfig): ValidatorFn {
    return (control: FormGroup): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        const matchControl = ApplicationUtil.getFormControl(config.fieldName,control);
        const matchControlValue = (matchControl) ? matchControl.value : '';
        if (FormProvider.ProcessRule(control,config)) {
            if ((RegexValidator.isNotBlank(control.value) && RegexValidator.isNotBlank(matchControlValue))) {
                if (!(matchControl && parseFloat(control.value) <= parseFloat(matchControlValue)))
                    return ObjectMaker.toJson(AnnotationTypes.lessThanEqualTo, config.message || null, [control.value, matchControlValue]);        
            }
        }
        return ObjectMaker.null();
    }
}
