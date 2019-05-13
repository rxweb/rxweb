import { BaseConfigFn } from './base-config-fn';
export interface TimeConfig extends BaseConfigFn<TimeConfig>{
    allowSeconds?: boolean;
    
}

export interface TimeRelationConfig<T> extends BaseConfigFn<T> {
    value?: string;
    fieldName?: string;
    allowSeconds?: boolean;
}

export interface MinTimeConfig extends TimeRelationConfig<MinTimeConfig> {
    operator?: ">" | ">=";
    
}

export interface MaxTimeConfig extends TimeRelationConfig<MinTimeConfig>  {
    operator?: "<" | "<=";
    
}
