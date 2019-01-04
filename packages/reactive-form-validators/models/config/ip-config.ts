import { BaseConfig } from './base-config'
import { IpVersion } from '../../enums'
export interface IpConfig extends BaseConfig {
  version: IpVersion;
  isCidr?: boolean;
}
