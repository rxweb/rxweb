import { BaseConfig } from './base-config'
export interface BaseConfigFn<T> extends BaseConfig {
    dynamicConfig?: (
        parent: { [key: string]: any },
        root: { [key: string]: any },
        config: any) => any
}