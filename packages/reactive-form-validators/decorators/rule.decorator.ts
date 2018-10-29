import { defaultContainer } from '../core/defaultContainer';
import { AnnotationTypes } from '../core/validator.static';
import { RuleConfig } from "../models/config/rule-config";

export function rule(config?:RuleConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target,parameterIndex, propertyKey,AnnotationTypes.rule,config)
    }
}
