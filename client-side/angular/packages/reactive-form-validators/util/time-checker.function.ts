import { AbstractControl } from "@angular/forms";
import { ApplicationUtil } from './app-util'
import { FormProvider } from "./form-provider";
import { RegexValidator } from "./regex-validator";
import { ObjectMaker } from "./object-maker";
import { AnnotationTypes } from "../core/validator.static";
import {OPERATORS} from "../const/operators.const"
import {getConfigObject} from "../util/config-provider";
import { RegExRule } from "./regex-rules";

function runCondition(leftValue: number, rightValue: number, operator: string): boolean {
    let result: boolean = false;
    switch (operator) {
        case OPERATORS.lessThan:
        case OPERATORS.greaterThan:
            result = leftValue > rightValue;
            break;
        case OPERATORS.lessThanEqualTo:
        case OPERATORS.greaterThanEqualTo:
            result = leftValue >= rightValue;
            break;
    }
    return result;
}

function isValid(control: AbstractControl, config: any) {
    return config.allowSeconds ? RegexValidator.isValid(control.value, RegExRule.timeWithSeconds) : RegexValidator.isValid(control.value, RegExRule.time);
}

function getTime(value: any) {
    let splitTime = (value) ? value.split(':') : [];
    return new Date(1970, 0, 1, splitTime[0] ? splitTime[0] : 0, splitTime[1] ? splitTime[1] : 0, splitTime[2] ? splitTime[2] : 0).getTime();
}

export function timeChecker(control: AbstractControl,config:any,operationType:string): { [key: string]: any } {
    config = getConfigObject(config, control);
      if (FormProvider.ProcessRule(control,config)) {
        if (RegexValidator.isNotBlank(control.value)) {
            if (isValid(control,config)) {
                let crossFormControl = config.fieldName ? ApplicationUtil.getFormControl(config.fieldName, control) : undefined;
                let crossControlValue = crossFormControl ? getTime(crossFormControl.value) : getTime(config.value);  
                let currentControlValue = getTime(control.value);
                let isValid = operationType == AnnotationTypes.minTime ? runCondition(currentControlValue, crossControlValue, config.operator || OPERATORS.greaterThanEqualTo) : runCondition(crossControlValue, currentControlValue, config.operator || OPERATORS.lessThanEqualTo)
                if (!isValid)
                    return ObjectMaker.toJson(operationType, config, [control.value])
            } else
                return ObjectMaker.toJson(operationType, config, [control.value])
        }
    }
    return ObjectMaker.null();
}