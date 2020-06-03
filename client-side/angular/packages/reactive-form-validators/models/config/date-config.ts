import { BaseConfigFn } from './base-config-fn';
export interface DateConfig extends BaseConfigFn<DateConfig>{
    value?: Date | string;
    fieldName?: string;
    allowISODate?: boolean;
}
