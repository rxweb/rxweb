import {
    ValidatorFn,
    AbstractControl} from "@angular/forms";
import { RegExRule } from "../util/regex-rules";
import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { HexColorConfig } from "../models/config/hex-color-config";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function hexColorValidator(config:HexColorConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                let hexRegex = config.isStrict ? RegExRule.strictHexColor : RegExRule.hexColor;
                if (!RegexValidator.isValid(control.value, hexRegex))
                    return ObjectMaker.toJson(AnnotationTypes.hexColor, config.message || null, [control.value])
            }
        }
        return ObjectMaker.null();
    }
}
