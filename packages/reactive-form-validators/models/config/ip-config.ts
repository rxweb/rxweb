import { BaseConfigFn } from './base-config-fn';
import { IpVersion } from '../../enums'
export interface IpConfig extends BaseConfigFn<IpConfig> {
  version?: IpVersion;
  isCidr?: boolean;
}
