import { BaseConfigFn } from './base-config-fn'
export interface IBANConfig extends BaseConfigFn<IBANConfig> {
        countryCode?:string
}
