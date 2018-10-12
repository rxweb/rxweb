import { defaultContainer } from '../core/defaultContainer';
import { AnnotationTypes } from '../core/validator.static';
import { ArrayConfig } from "../models/config/array-config";

export function noneOf(config?:ArrayConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target,parameterIndex, propertyKey,AnnotationTypes.noneOf,config)
    }
}
