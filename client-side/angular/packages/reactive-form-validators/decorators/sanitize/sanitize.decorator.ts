import { defaultContainer } from '../../core/defaultContainer';
import { DECORATORS } from "../../const/decorators.const";
import { SanitizeConfig } from '../../models/config/sanitize-config'
export function sanitize(config: SanitizeConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.addSanitizer(target, parameterIndex, propertyKey, DECORATORS.sanitize,config)
    } 
}

