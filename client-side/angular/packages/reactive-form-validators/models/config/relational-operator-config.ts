import { BaseConfigFn } from './base-config-fn';
export interface RelationalOperatorConfig extends BaseConfigFn<RelationalOperatorConfig>{
    fieldName?: string;
    value?: any;
    isArrayControl?: boolean;
}
