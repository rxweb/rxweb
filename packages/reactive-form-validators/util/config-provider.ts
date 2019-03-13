import {FormProvider} from "./form-provider"
import { AbstractControl } from "@angular/forms"
import { clone } from "../services/entity.service"
export function getConfigObject(config: any,control:any): any {
    return (config != undefined && config != true) ? configProvider(control,config) : {};
}
function configProvider(control:AbstractControl,config:any):any{
    if(config.dynamicConfig){
        let currentConfig = FormProvider.ProcessRule(control,clone(config),true)
        if(typeof currentConfig != "boolean"){
                currentConfig.conditionalExpression = config.conditionalExpression;
                currentConfig.dynamicConfig = config.dynamicConfig;    
            return currentConfig;
        }
    }
        return config;
}