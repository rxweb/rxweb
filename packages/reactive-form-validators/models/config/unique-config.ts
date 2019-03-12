import { BaseConfigFn } from './base-config-fn';
export interface UniqueConfig extends BaseConfigFn<UniqueConfig> {
    additionalValidation?: Function; 
}
