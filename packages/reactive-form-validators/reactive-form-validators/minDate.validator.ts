import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { DateConfig } from "../models/config/date-config";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { RegExRule,DateProvider } from "../util/index";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function minDateValidator(config: DateConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        var dateProvider = new DateProvider();
          if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                if (dateProvider.isValid(control.value)) {
                    let minDate = config.value;
                    let currentControlValue = dateProvider.getDate(control.value);
                    if (!(currentControlValue >= minDate))
                        return ObjectMaker.toJson(AnnotationTypes.minDate, config.message || null, [control.value])
                } else
                    return ObjectMaker.toJson(AnnotationTypes.minDate, config.message || null, [control.value])
            }
        }
        return ObjectMaker.null();
    }
}
