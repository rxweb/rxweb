import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { RuleConfig } from "../models/config/rule-config";

export function rule(config?:RuleConfig) {
    return baseDecoratorFunction (AnnotationTypes.rule,config)
}
