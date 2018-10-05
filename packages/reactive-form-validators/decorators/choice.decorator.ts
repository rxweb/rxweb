import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { AnnotationTypes } from '../core/validator.static';
import { DecoratorName } from "../util/decorator-name";
import { ChoiceConfig } from "../models/config/choice-config";

export function choice(config?:ChoiceConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target,parameterIndex, propertyKey,AnnotationTypes.choice,config)
    }
}
