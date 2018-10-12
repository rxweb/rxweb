import { defaultContainer } from '../core/defaultContainer';
import { AnnotationTypes } from '../core/validator.static';
import { BaseConfig } from "../models/config/base-config";

export function latitude(config?:BaseConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.latitude, config)
    } 
}
