import {
  ValidatorFn
} from "@angular/forms";
import { defaultContainer } from "../core/defaultContainer"
import { STRING } from '../const/validator.const';
import { ApplicationUtil } from '../util/app-util';

export function baseValidator(config: any, type: any, validator: Function): ValidatorFn {
  var rxwebValidator = (control: any, target?: object): { [key: string]: any } => {
    if (typeof control == STRING)
      defaultContainer.init(target, 0, control, type, config,false);
    else{
      if (config && (!control.validatorConfig || !control.validatorConfig[type])) 
        ApplicationUtil.configureControl(control, config, type);
      return  validator(control);
    }
    return null
  }
  return rxwebValidator;
}
