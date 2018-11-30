import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { RangeConfig } from "../models/config/range-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function rangeValidator(config:RangeConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
          if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                if (!(String(control.value).indexOf(".") == -1 && parseInt(control.value) >= config.minimumNumber && parseInt(control.value) <= config.maximumNumber))
                    return ObjectMaker.toJson(AnnotationTypes.range, config.message || null, [config.minimumNumber, config.maximumNumber, control.value])
            }
        }
        return ObjectMaker.null();
    }
}
