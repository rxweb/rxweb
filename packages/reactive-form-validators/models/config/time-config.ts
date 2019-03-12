import { BaseConfigFn } from './base-config-fn';
export interface TimeConfig extends BaseConfigFn<TimeConfig>{
    allowSeconds?: boolean;
    
}
