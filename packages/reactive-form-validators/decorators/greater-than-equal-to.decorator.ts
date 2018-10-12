import { defaultContainer } from '../core/defaultContainer';
import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";

export function greaterThanEqualTo(config:RelationalOperatorConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.greaterThanEqualTo, config)    
    }
}
