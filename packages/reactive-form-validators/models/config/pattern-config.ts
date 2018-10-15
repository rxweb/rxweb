import { BaseConfig } from './base-config'
export interface PatternConfig extends BaseConfig{
    pattern: { [key: string]:  RegExp }
   
}
