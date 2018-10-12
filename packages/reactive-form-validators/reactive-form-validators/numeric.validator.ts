import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { NumericConfig } from "../models/config/numeric-config";
import { AnnotationTypes } from "../core/validator.static";
import {NumericValueType } from '../enums'
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function numericValidator(config: NumericConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
          if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                if (!RegexValidator.isValid(control.value, ApplicationUtil.numericValidation(config.allowDecimal,config.acceptValue)))
                    return ObjectMaker.toJson(AnnotationTypes.numeric, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}
