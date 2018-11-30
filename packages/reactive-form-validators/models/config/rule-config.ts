import { BaseConfig } from './base-config'

export interface RuleConfig {
    customRules:Function[];
    conditionalExpression?: string | Function;
}
