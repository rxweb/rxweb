import { BaseConfigFn } from './base-config-fn';
export interface BaseDateConfig extends BaseConfigFn<BaseDateConfig>{
    allowISODate?: boolean;
    dateFormat?: string;
    isValid?: Function;
}
