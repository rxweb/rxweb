import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";
import { RegExRule } from "../util/regex-rules";
import { RegexValidator } from "../util/regex-validator";
import { MessageConfig } from "../models/config/message-config";
import { ApplicationUtil } from "../util/app-util";
import { Linq } from "../util/linq";
import { DecoratorName } from "../util/decorator-name";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";

export function hexColorValidator(config:MessageConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        if (Linq.IsPassed(formGroupValue, config.conditionalExpressions)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                if (!RegexValidator.isValid(controlValue, RegExRule.HexColor))
                    return ObjectMaker.toJson(AnnotationTypes.hexColor, config.message || null, [controlValue])
            }
        }
        return ObjectMaker.null();
    }
}
