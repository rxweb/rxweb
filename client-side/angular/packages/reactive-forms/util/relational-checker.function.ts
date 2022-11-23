import { ApplicationUtil } from "./app-util";
import { FormProvider } from "./form-provider";
import { RegexValidator } from "./regex-validator";
import { AnnotationTypes } from "../core/validator.static";
import { ObjectMaker } from "./object-maker";
import {getConfigObject} from "../util/config-provider";
import { AbstractControl } from "../abstract/abstract-control";
export function relationalCheck(control:AbstractControl,config:any,relationalOperatorName:string){
    config = getConfigObject(config,control);
    const matchControl = config.fieldName ? ApplicationUtil.getFormControl(config.fieldName,control) : undefined;
    const matchControlValue = (matchControl) ? matchControl.value : config.value !== undefined ? config.value :'';
    if (FormProvider.ProcessRule(control,config)) {
        if (RegexValidator.isNotBlank(control.value) && RegexValidator.isNotBlank(matchControlValue)) {
            let isValid = false;
            switch(relationalOperatorName){
                case AnnotationTypes.greaterThan:
                isValid = parseFloat(control.value) > parseFloat(matchControlValue);
                break;
                case AnnotationTypes.lessThan:
                isValid = parseFloat(control.value) < parseFloat(matchControlValue)
                break;
                case AnnotationTypes.greaterThanEqualTo:
                isValid = parseFloat(control.value) >= parseFloat(matchControlValue)
                break;
                case AnnotationTypes.lessThanEqualTo:
                isValid = parseFloat(control.value) <= parseFloat(matchControlValue)
                break;
            }
            if(!isValid)
                return ObjectMaker.toJson(relationalOperatorName, config, [control.value, matchControlValue]);
        }
    }
    return ObjectMaker.null();
}