import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { DecoratorName } from "../util/decorator-name";
import { PatternConfig } from "../models/config/pattern-config";
import { AnnotationTypes } from "../core/validator.static";
export function pattern(config:PatternConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.pattern, config)    
    }
}
