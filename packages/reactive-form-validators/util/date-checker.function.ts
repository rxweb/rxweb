import { AbstractControl } from "@angular/forms";
import { ApplicationUtil } from "./app-util";
import { DateProvider } from "./date-provider";
import { FormProvider } from "./form-provider";
import { RegexValidator } from "./regex-validator";
import { ObjectMaker } from "./object-maker";
import { AnnotationTypes } from "../core/validator.static";

export function dateChecker(control: AbstractControl,config:any,operationType:string): { [key: string]: any } {
    config = ApplicationUtil.getConfigObject(config);
    var dateProvider = new DateProvider();
      if (FormProvider.ProcessRule(control,config)) {
        if (RegexValidator.isNotBlank(control.value)) {
            if (dateProvider.isValid(control.value)) {
                let checkDate = dateProvider.getCompareDate(config,control);
                let currentControlValue = dateProvider.getDate(control.value);
                let isValid = operationType == AnnotationTypes.minDate ? (currentControlValue >= checkDate) : (checkDate >= currentControlValue);
                if (!isValid)
                    return ObjectMaker.toJson(operationType, config, [control.value])
            } else
                return ObjectMaker.toJson(operationType, config, [control.value])
        }
    }
    return ObjectMaker.null();
}

export function validateDate(control: AbstractControl,config:any,operationType:string): { [key: string]: any } {
    config = ApplicationUtil.getConfigObject(config);
    var dateProvider = new DateProvider();
      if (FormProvider.ProcessRule(control,config)) {
        if (RegexValidator.isNotBlank(control.value)) {
            if (!dateProvider.isValid(control.value)) {
                return ObjectMaker.toJson(operationType, config, [control.value])
        }
    }
}
    return ObjectMaker.null();
}