import { defaultContainer } from '../core/defaultContainer';
import { AnnotationTypes } from "../core/validator.static";
import { DefaultConfig } from "../models/config/default-config";

export function json(config?: DefaultConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.json, config)    
    }
}
