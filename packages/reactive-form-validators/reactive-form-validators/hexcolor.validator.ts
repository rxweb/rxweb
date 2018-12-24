import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";
import { RegExRule } from "../util/regex-rules";
import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { HexColorConfig } from "../models/config/hex-color-config";
import { ValidatorValueChecker } from "../util/validator-value-checker";
export function hexColorValidator(config:HexColorConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        if (ValidatorValueChecker.pass(control,config)) {
            if (!RegexValidator.isValid(control.value, RegExRule.strictHexColor))
                    return ObjectMaker.toJson(AnnotationTypes.hexColor, config, [control.value])
            }
        return ObjectMaker.null();
    }
}
