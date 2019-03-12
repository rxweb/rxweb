import { BaseConfigFn } from './base-config-fn';
export interface PatternConfig extends BaseConfigFn<PatternConfig>{
    expression?: { [key: string]:  RegExp }
   
}
