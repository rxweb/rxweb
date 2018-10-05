import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { DecoratorName } from "../util/decorator-name";
import { CompareConfig } from "../models/config/compare-config";
import { AnnotationTypes } from "../core/validator.static";

export function compare(config:CompareConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.compare, config)
    }
}
