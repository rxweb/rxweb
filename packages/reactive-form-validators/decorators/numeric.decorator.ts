import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { AnnotationTypes } from '../core/validator.static';
import { DecoratorName } from "../util/decorator-name";
import { NumericConfig } from "../models/config/numeric-config";

export function numeric(config?:NumericConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target,parameterIndex, propertyKey,AnnotationTypes.numeric,config)
    }
}
