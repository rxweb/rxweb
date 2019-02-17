import { defaultContainer } from '../../core/defaultContainer';
import { DisableConfig } from "../../models/config/disable-config";

export function disabled(config?: DisableConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.addDisableConfig(target, parameterIndex, propertyKey, config)
    } 
}

