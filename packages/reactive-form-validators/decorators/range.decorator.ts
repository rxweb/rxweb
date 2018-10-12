import { defaultContainer } from '../core/defaultContainer';
import { RangeConfig } from "../models/config/range-config";
import { AnnotationTypes } from "../core/validator.static";

export function range(config:RangeConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.range, config)    
    }
}
