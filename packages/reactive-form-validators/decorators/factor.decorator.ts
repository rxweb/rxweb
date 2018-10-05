import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { AnnotationTypes } from '../core/validator.static';
import { DecoratorName } from "../util/decorator-name";
import { FactorConfig } from "../models/config/factor-config";

export function factor(config?:FactorConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.factor, config)
    } 
}
