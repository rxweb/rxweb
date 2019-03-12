import { BaseConfigFn } from './base-config-fn';
export interface FactorConfig extends BaseConfigFn<FactorConfig> {
  dividend?:number;
  fieldName?:string;
}
