import { AbstractControl } from "@angular/forms";
import { ApplicationUtil } from "./app-util";
import { FormProvider } from "./form-provider";
import { RegexValidator } from "./regex-validator";

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