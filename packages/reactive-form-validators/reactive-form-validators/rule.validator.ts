import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { RuleConfig } from "../models/config/rule-config";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';

export function ruleValidator(config: RuleConfig,entity:any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) {
                let result = null;
                for(let rule of config.customRules) {
                     result = rule(entity);
                     if(result)
                      break;
                }
              if(result)
                 return result;
            }return ObjectMaker.null();
        } 
    }
