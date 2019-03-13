import { BaseConfig } from './base-config'
export interface BaseConfigFn<T> extends BaseConfig {
    dynamicConfig?: (
        parent: { [key: string]: any },
        root: { [key: string]: any },
        config: Pick<T, Exclude<keyof T, "dynamicConfig" | "conditionnalExpression">>) => Pick<T, Exclude<keyof T, "dynamicConfig" | "conditionnalExpression">>
}