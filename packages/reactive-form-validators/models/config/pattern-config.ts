import { BaseConfig } from './base-config'
export interface PatternConfig extends BaseConfig{
    expression: { [key: string]:  RegExp }
   
}
