import { AbstractControl } from "@angular/forms";
import { DateProvider } from "./date-provider";
import { FormProvider } from "./form-provider";
import { RegexValidator } from "./regex-validator";
import { ObjectMaker } from "./object-maker";
import { AnnotationTypes } from "../core/validator.static";
import {OPERATORS} from "../const/operators.const"
import {getConfigObject} from "../util/config-provider";
function runCondition(leftValue:Date,rightValue:Date,operator:string):boolean{
    let result:boolean  = false;
    switch(operator){
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

export function dateChecker(control: AbstractControl,config:any,operationType:string): { [key: string]: any } {
    config = getConfigObject(config,control);
    var dateProvider = new DateProvider();
      if (FormProvider.ProcessRule(control,config)) {
        if (RegexValidator.isNotBlank(control.value)) {
            if (dateProvider.isDate(control.value) || dateProvider.isValid(control.value)) {
                let checkDate = dateProvider.getCompareDate(config,control);
                let currentControlValue = dateProvider.getDate(control.value);
                let isValid = operationType == AnnotationTypes.minDate ? runCondition(currentControlValue,checkDate,config.operator || OPERATORS.greaterThanEqualTo): runCondition(checkDate,currentControlValue,config.operator || OPERATORS.lessThanEqualTo)
                if (!isValid)
                    return ObjectMaker.toJson(operationType, config, [control.value])
            } else
                return ObjectMaker.toJson(operationType, config, [control.value])
        }
    }
    return ObjectMaker.null();
}

export function validateDate(control: AbstractControl,config:any,operationType:string): { [key: string]: any } {
    config = getConfigObject(config,control);
    var dateProvider = new DateProvider();
      if (FormProvider.ProcessRule(control,config)) {
        if (RegexValidator.isNotBlank(control.value)) {
            if (!dateProvider.isDate(control.value) && !dateProvider.isValid(control.value)) {
                return ObjectMaker.toJson(operationType, config, [control.value])
        }
    }
}
    return ObjectMaker.null();
}