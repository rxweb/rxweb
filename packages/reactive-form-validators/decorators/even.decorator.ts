import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { AnnotationTypes } from '../core/validator.static';
import { DecoratorName } from "../util/decorator-name";
import { BaseConfig } from "../models/config/base-config";

export function even(config?:BaseConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.even, config)
    } 
}
