import { defaultContainer } from '../core/defaultContainer';
import { PropsValidationConfig } from '../models/config/props-validation-config'

export function propsValidation(config: PropsValidationConfig[]) {
    return function (
        target: Object
    ) {
        defaultContainer.addPropsValidation(target,config)
    } 
}

