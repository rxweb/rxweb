import { BaseConfig } from './base-config'
export interface DateConfig extends BaseConfig{
    value?: Date | string;
    fieldName?:string;
}
