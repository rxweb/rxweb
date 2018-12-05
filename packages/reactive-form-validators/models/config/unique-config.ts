import { BaseConfig } from './base-config'
export interface UniqueConfig extends BaseConfig {
    additionalValidation?: Function; 
}
