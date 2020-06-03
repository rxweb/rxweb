import { defaultContainer } from '../core/defaultContainer';
import { PropsConfig } from '../models/config/props-config'

export function model(config?: PropsConfig[]) {
    return function (
        target: Object
    ) {
        defaultContainer.addPropsConfig(target,config)
    } 
}

