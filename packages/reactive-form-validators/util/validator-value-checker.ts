import { AbstractControl } from "@angular/forms";
import { ApplicationUtil } from "./app-util";
import { FormProvider } from "./form-provider";
import { RegexValidator } from "./regex-validator";
import { GREATER_THAN, LESS_THAN, GREATER_THAN_EQUAL_TO, LESS_THAN_EQUAL_TO } from "../const/app.const";
import { AnnotationTypes } from "../core/validator.static";
import { ObjectMaker } from "./object-maker";

export class ValidatorValueChecker{

    static pass(control:AbstractControl,config:any):boolean {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) 
            return RegexValidator.isNotBlank(control.value)
        else
            return false;
    }

    static passArrayValue(control:AbstractControl,config:any){
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) 
            return control.value instanceof Array;
        else
            return false;
    }
}