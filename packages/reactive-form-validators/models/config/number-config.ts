import { BaseConfig } from './base-config'
export interface NumberConfig extends BaseConfig{
    value?: number;
    dynamicConfig?: NumberConfigFn
}


export interface NumberConfigFn {
    (parent: { [key: string]: any }, root: { [key: string]: any }): NumberConfig;
}

