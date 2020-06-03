import { BaseConfigFn } from './base-config-fn';
export interface DefaultConfig extends BaseConfigFn<DefaultConfig>{
    value?: string;
    
}
