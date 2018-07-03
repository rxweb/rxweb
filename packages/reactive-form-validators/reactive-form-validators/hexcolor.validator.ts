import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";
import { RegExRule } from "../util/regex-rules";
import { RegexValidator } from "../util/regex-validator";
import { ApplicationUtil } from "../util/app-util";
import { Linq } from "../util/linq";
import { DecoratorName } from "../util/decorator-name";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { HexColorConfig } from "../models/config/hex-color-config";

export function hexColorValidator(config:HexColorConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        config = ApplicationUtil.getConfigObject(config);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        if (Linq.IsPassed(formGroupValue, config.conditionalExpressions, parentObject)) {
            if (RegexValidator.isNotBlank(controlValue)) {
                let hexRegex = config.isStrict ? RegExRule.strictHexColor : RegExRule.hexColor;
                if (!RegexValidator.isValid(controlValue, hexRegex))
                    return ObjectMaker.toJson(AnnotationTypes.hexColor, config.message || null, [controlValue])
            }
        }
        return ObjectMaker.null();
    }
}
