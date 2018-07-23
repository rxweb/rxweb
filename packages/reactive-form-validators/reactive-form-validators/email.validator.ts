import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";
import { SIMPLE_EMAIL_VALIDATION } from "../util/form-const";
import { RegExRule } from "../util/regex-rules";
import { RegexValidator } from "../util/regex-validator";
import { EmailConfig } from "../models/config/email-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { ObjectMaker } from "../util/index";
import { DecoratorName } from "../util/decorator-name";
import { AnnotationTypes } from "../core/validator.static";

export function emailValidator(config:EmailConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        config = ApplicationUtil.getConfigObject(config);
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                if (!RegexValidator.isValid(controlValue, RegExRule.basicEmail ))
                    return ObjectMaker.toJson(AnnotationTypes.email, config.message || null, [controlValue])
            }
        }
        return ObjectMaker.null();
    }
}
