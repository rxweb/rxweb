import { defaultContainer } from '../core/defaultContainer';
import { AlphaConfig } from "../models/config/alpha-config";
import { AnnotationTypes } from "../core/validator.static";

export function alphaNumeric(config?: AlphaConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.alphaNumeric, config)
    }
}
