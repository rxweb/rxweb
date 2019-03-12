import { BaseConfigFn } from './base-config-fn';
export interface CreditCardConfig extends BaseConfigFn<CreditCardConfig> {
    creditCardTypes?: string[];
    fieldName?:string;
}
