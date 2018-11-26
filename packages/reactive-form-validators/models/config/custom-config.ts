import { BaseConfig } from './base-config'

export interface CustomConfig {
    customRules:Function[];
    additionalValue:any,
    conditionalExpression?: string | Function;
}
