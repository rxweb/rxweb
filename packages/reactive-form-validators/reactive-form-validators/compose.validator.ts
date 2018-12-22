import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { ObjectMaker } from "../util/object-maker";
import { ComposeConfig } from "../models/config/compose-config";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';

export function composeValidator(config: ComposeConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) {
            if (config.validators) {
                let result = undefined;
                for(let validator of config.validators){
                   result = validator(control);
                   if(result)
                      break;
                }
                  if(result)
                    return result;   
            }
        } return ObjectMaker.null();
    }
}
