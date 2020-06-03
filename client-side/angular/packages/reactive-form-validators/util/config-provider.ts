import {FormProvider} from "./form-provider"
import { AbstractControl } from "@angular/forms"
import { clone } from "../services/entity.service"
import { CONFIG_REQUIRED_FIELDS } from "../const/config-required-fields.const";
export function getConfigObject(config: any,control:any,configName:string = ''): any {
    return (config != undefined && config != true) ? configProvider(control,config,configName) : {};
}
function configProvider(control:AbstractControl,config:any,configName:string):any{
    if(config.dynamicConfig){
        let currentConfig = FormProvider.ProcessRule(control,clone(config),true)
        if(typeof currentConfig != "boolean"){
                currentConfig.conditionalExpression = config.conditionalExpression;
                currentConfig.dynamicConfig = config.dynamicConfig; 
                Object.keys(config).forEach(t=>{
                    if((t != "conditionalExpression" && t != "dynamicConfig") || currentConfig[t]  === undefined){
                        currentConfig[t] = config[t];
                    }
                })   
            return currentConfig;
        }else
            return config;
    }
        return checkRequiredProps(config,configName);
}


function checkRequiredProps(config:any,configName:string){
    let props = CONFIG_REQUIRED_FIELDS[configName];
    if(configName){
        props.forEach(prop => {
            if(config[prop] === undefined)
                    throw new Error(`Pass the property of '${prop}' with value in the ${configName}, otherwise it won't work.`);
        })
    }
    return config
}