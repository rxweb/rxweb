import { BaseConfigFn } from './base-config-fn';
export interface RangeConfig extends BaseConfigFn<RangeConfig>{
    minimumNumber?: number;
    maximumNumber?: number;
    
}
