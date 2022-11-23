import {
    ValidatorFn, AsyncValidatorFn
} from "@angular/forms";
import { defaultContainer } from "../core/defaultContainer"
import { STRING } from '../const/validator.const';
import { ApplicationUtil } from '../util/app-util';
import { RX_WEB_VALIDATOR } from "../const";
import { Observable } from "rxjs";

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
    Object.defineProperty(rxwebValidator, "name", { value: RX_WEB_VALIDATOR });
    return rxwebValidator;
}

export function baseAsyncValidatorExtension(config: any, type: any, validator: Function): AsyncValidatorFn {
    var rxwebValidator = (control: any, target?: object): Observable<{ [key: string]: any }> => {
        if (typeof control == STRING)
            defaultContainer.init(target, 0, control, type, config, true);
        else {
            if (config && (!control.validatorConfig || !control.validatorConfig[type]))
                ApplicationUtil.configureControl(control, config, type);
            return validator(control);
        }
        return null
    }
    Object.defineProperty(rxwebValidator, "name", { value: RX_WEB_VALIDATOR });
    return rxwebValidator;
}
