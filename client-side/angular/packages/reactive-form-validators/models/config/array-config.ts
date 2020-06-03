import { BaseConfigFn } from './base-config-fn';
export interface ArrayConfig extends BaseConfigFn<ArrayConfig> {
    matchValues?:any[]
}
