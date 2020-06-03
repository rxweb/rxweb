import { BaseConfigFn } from './base-config-fn';
export interface FieldConfig extends BaseConfigFn<FieldConfig> {
    fieldName?: string;
}
